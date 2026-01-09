'use client'

import { animated, useSpring } from 'react-spring'
import { Button, Card, Col, Row } from 'antd'
import { CardTitle, Text } from '@/components/atoms'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import ProgressSteps from '@/components/ProgressSteps'
import { renderDangerous } from '@/utils/dangerous-renders'
import styled from 'styled-components'
import { trpc } from '@/utils/trpc'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTimelineSteps } from '@/utils/timeline'
import { useTimerContext } from '@/hooks/useTimerContext'

const StyledPage = styled.div`
  padding: 16px;

  display: flex;
  justify-content: center;
  width: 100%;

  overflow-x: hidden;

  & > div {
    width: 100%;
    max-width: 560px;

    display: flex;
    flex-direction: column;
  }

  .ant-card {
    width: 100%;
    max-height: 360px;

    .ant-card-body {
      height: 100%;
    }
  }
`

const VerticalRow = styled(Row)`
  flex-direction: column;
  height: 100%;
`

const PageLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <StyledPage>
      <div>{children}</div>
    </StyledPage>
  )
}

const StyledCard = styled(animated(Card))`
  flex: 1;
`

const useBakingRecipe = () => {
  const { keyRecipe, setKeyRecipe } = useTimerContext()

  const router = useRouter()
  const searchParams = useSearchParams()

  const firstRenderRef = useRef(true)

  const recipeQueryKey = searchParams?.get('recipeKey')

  useEffect(() => {
    // query is always empty on first render
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }

    if (recipeQueryKey) {
      setKeyRecipe({ key: recipeQueryKey })
      return
    }

    if (keyRecipe?.key) {
      // add key to query
      router.push(`/baking?recipeKey=${keyRecipe.key}`)
      return
    }
  }, [recipeQueryKey, keyRecipe?.key, router, setKeyRecipe])

  return {
    recipeKey: keyRecipe?.key || null,
    setRecipeKey: (key: string) => setKeyRecipe({ key }),
  }
}

const BakingPage: React.FC = () => {
  const { recipeKey } = useBakingRecipe()

  const { data, isLoading } = trpc['get-recipe'].useQuery({ key: recipeKey })

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [showingStepIndex, setShowingStepIndex] = useState(0)

  const [style, api] = useSpring(() => ({ transform: 'translateX(0%)' }))

  const steps = useTimelineSteps(data?.recipe)

  const slide = useCallback(
    (prev: number, next: number) => {
      const factor = prev < next ? 1 : -1

      api.start({
        from: { transform: `translateX(${100 * factor}%)` },
        to: { transform: 'translateX(0%)' },
      })
    },
    [api]
  )

  const goToSlide = useCallback(
    (next: number | ((_prev: number) => number), moveCurrent?: boolean) => {
      setShowingStepIndex((prevSlide) => {
        const nextSlide = typeof next === 'function' ? next(prevSlide) : next

        slide(prevSlide, nextSlide)

        if (moveCurrent) {
          setCurrentStepIndex(nextSlide)
        }

        return nextSlide
      })
    },
    [slide]
  )

  // left and right arrows changes showingStepIndex
  const handleArrowClick = useCallback(
    (direction: 'left' | 'right', moveCurrent?: boolean) => {
      if (direction === 'left') {
        if (showingStepIndex > 0) {
          goToSlide((prev) => prev - 1, moveCurrent)
        }
      }

      if (direction === 'right') {
        if (showingStepIndex < steps.length - 1) {
          goToSlide((prev) => prev + 1, moveCurrent)
        }
      }
    },
    [showingStepIndex, steps, goToSlide]
  )

  // handleArrowClick eventListener
  useEffect(() => {
    const handleArrowClickEvent = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handleArrowClick('left')
      }

      if (e.key === 'ArrowRight') {
        handleArrowClick('right')
      }

      // enterkey movesCurrent as well
      if (e.key === 'Enter' && currentStepIndex === showingStepIndex) {
        handleArrowClick('right', true)
      }

      // backspace key movesCurrent back
      if (e.key === 'Backspace' && currentStepIndex === showingStepIndex) {
        handleArrowClick('left', true)
      }
    }

    window.addEventListener('keydown', handleArrowClickEvent)

    return () => {
      window.removeEventListener('keydown', handleArrowClickEvent)
    }
  }, [handleArrowClick, currentStepIndex, showingStepIndex])

  if (isLoading) {
    return <StyledPage>Loading...</StyledPage>
  }

  if (!data) {
    // we can replace this with some select recipe page
    return <StyledPage>Come back with a recipe key</StyledPage>
  }

  const onNext = () => {
    goToSlide((prev) => prev + 1)
    setCurrentStepIndex((prev) => prev + 1)
  }

  const resetSteps = () => {
    goToSlide(0)
    setCurrentStepIndex(0)
  }

  const showingStep = steps[showingStepIndex]

  return (
    <PageLayout>
      <Row style={{ marginBottom: '8px' }}>
        <Link href={`/recipes/${data.recipe.key}`}>
          <CardTitle>{data.recipe.name}</CardTitle>
        </Link>
      </Row>
      <Row>
        <ProgressSteps
          onStepClick={(index) => {
            setShowingStepIndex((prev) => {
              slide(prev, index)
              return index
            })
          }}
          showing={showingStepIndex}
          total={steps.length}
          current={currentStepIndex}
        />
      </Row>
      <StyledCard style={style}>
        <VerticalRow>
          <Col flex={1}>
            <Row style={{ marginBottom: '8px' }}>
              <Text fs='h4'>{showingStep.title}</Text>
            </Row>
            <Row style={{ marginBottom: '8px', height: '200px' }}>
              <Text>{renderDangerous.div(showingStep.description)}</Text>
            </Row>
          </Col>
          <Col>
            <Row justify='end'>
              <Col>
                {showingStepIndex === currentStepIndex &&
                  showingStepIndex < steps.length - 1 && (
                    <Button
                      style={{ width: '120px' }}
                      type='primary'
                      onClick={onNext}
                    >
                      Done
                    </Button>
                  )}
                {/* if we're not on the current step show a button to show current */}
                {showingStepIndex !== currentStepIndex && (
                  <Button
                    onClick={() =>
                      setShowingStepIndex((prev) => {
                        slide(prev, currentStepIndex)
                        return currentStepIndex
                      })
                    }
                  >
                    {showingStepIndex > currentStepIndex && <LeftOutlined />}
                    <Text>current step</Text>
                    {showingStepIndex < currentStepIndex && <RightOutlined />}
                  </Button>
                )}
                {/* show start again button for last step */}
                {showingStepIndex === steps.length - 1 &&
                  currentStepIndex === steps.length - 1 && (
                    <Button onClick={resetSteps}>
                      <Text>Start again</Text>
                    </Button>
                  )}
              </Col>
            </Row>
          </Col>
        </VerticalRow>
      </StyledCard>
      <Row justify='space-between' style={{ width: '100%', marginTop: '8px' }}>
        <Col>
          {steps[showingStepIndex - 1] && (
            <Button
              onClick={() => {
                setShowingStepIndex((prev) => {
                  slide(prev, prev - 1)
                  return prev - 1
                })
              }}
              type='text'
            >
              <LeftOutlined />
              <Text>{steps[showingStepIndex - 1]?.title}</Text>
            </Button>
          )}
        </Col>
        <Col>
          {steps[showingStepIndex + 1] && (
            <Button
              onClick={() => {
                setShowingStepIndex((prev) => {
                  slide(prev, prev + 1)
                  return prev + 1
                })
              }}
              type='text'
            >
              <Text>{steps[showingStepIndex + 1]?.title}</Text>
              <RightOutlined />
            </Button>
          )}
        </Col>
      </Row>
    </PageLayout>
  )
}

export default BakingPage
