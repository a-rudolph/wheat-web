import { Button, CardTitle, Text } from '@/components/atoms'
import { Col, Row } from 'antd'
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import styled, { css } from 'styled-components'
import useDragScroller, {
  SCROLL_DURATION,
  SCROLLER_ID,
} from '@/hooks/useDragScroller'
import { animated } from 'react-spring'
import { appRouter } from '@/pages/api/trpc/[trpc]'
import BasicLayout from '@/layouts/BasicLayout'
import breakpoints from '@/constants/breakpoints'
import { createServerSideHelpers } from '@trpc/react-query/server'
import dynamic from 'next/dynamic'
import NavBar from '@/layouts/NavBar'
import RecipeDetail from '@/components/RecipeDetail'
import { useCurrentRecipeStore } from 'stores/current-recipe'
import { createResponsiveStyle } from '@/styles/themes'
import superjson from 'superjson'

const DetailedTimeline = dynamic(
  () => import('@/components/DetailedTimeline'),
  {
    ssr: false,
  }
)

const StartRecipeButton = dynamic(
  () => import('@/components/StartRecipeButton'),
  {
    ssr: false,
  }
)

const ScrollContainer = styled(animated.div)`
  width: 100vw;
  overflow-x: scroll;
  padding: 24px 0;

  ::-webkit-scrollbar {
    height: 0px;
  }

  .pages {
    display: flex;
    width: 200vw;
  }

  .scroll-column {
    height: 100vw;
  }

  @media screen and (min-width: ${breakpoints.sm}px) {
    width: auto;

    .pages {
      width: auto;
    }
  }
`

const StyledNav = styled.div<{ $side: number; $count: number }>`
  width: 100vw;
  height: 32px;

  .slider {
    height: 4px;
    width: ${({ $count }) => 100 / $count}vw;
    position: absolute;
    top: 0;

    transition: all ${SCROLL_DURATION / 1_000}s;

    ${({ $side }) => {
      if ($side === 0) {
        return css`
          left: 0;
        `
      }

      return css`
        left: 50vw;
      `
    }}
    background: ${({ theme }) => theme.colors.wheaty_1};
  }
`

const FloatingButton = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 10;
  display: none;

  ${createResponsiveStyle.desktop`
    display: block;
  `}
`

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const Page: React.FC<PageProps> = ({ recipe }) => {
  const { startRecipe, stopRecipe, step } = useCurrentRecipeStore()

  const { side, scroll, goTo } = useDragScroller({
    initialSlide: step === null ? 0 : 1,
  })

  return (
    <BasicLayout.Card>
      <CardTitle>{recipe.name}</CardTitle>
      <ScrollContainer scrollLeft={scroll.left} id={SCROLLER_ID}>
        <div className='pages'>
          <RecipeDetail recipe={recipe} />
          <DetailedTimeline recipe={recipe} />
        </div>
      </ScrollContainer>
      <FloatingButton>
        <StartRecipeButton
          step={step}
          onClick={() => {
            if (step !== null) {
              stopRecipe()
              return
            }

            goTo(1)
            startRecipe()
          }}
        />
      </FloatingButton>
      <NavBar>
        <StyledNav $count={2} $side={side}>
          <div className='slider'></div>
          <Row
            justify='space-between'
            align='middle'
            style={{ height: '100%' }}
          >
            <Col style={{ flex: 1 }}>
              <Button block={true} onClick={() => goTo(0)} type='ghost'>
                <Text>Basics</Text>
              </Button>
            </Col>
            <Col style={{ width: '88px', position: 'relative', height: '1px' }}>
              <StartRecipeButton
                step={step}
                centered={true}
                onClick={() => {
                  if (step !== null) {
                    stopRecipe()
                    return
                  }

                  goTo(1)
                  startRecipe()
                }}
              />
            </Col>
            <Col style={{ flex: 1 }}>
              <Button block={true} type='ghost' onClick={() => goTo(1)}>
                <Text>Schedule</Text>
              </Button>
            </Col>
          </Row>
        </StyledNav>
      </NavBar>
    </BasicLayout.Card>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  })

  const data = await helpers['get-all-recipes'].fetch()

  const paths = data.recipes.map((recipe) => {
    return {
      params: { key: recipe.key },
    }
  })

  return {
    fallback: false,
    paths,
  }
}

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ key: string }>) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  })

  const data = await helpers['get-recipe'].fetch({ key: params?.key })

  return {
    props: { recipe: data.recipe },
  }
}

export default Page
