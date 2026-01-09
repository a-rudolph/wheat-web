'use client'

import { animated, config, useSpring } from 'react-spring'
import { CardTitle, Text } from '@/components/atoms'
import { Col, Row } from 'antd'
import { getColor, getStyle } from '@/styles/themes'
import Link from 'next/link'
import SimpleTimeline from '@/components/SimpleTimeline'
import styled from 'styled-components'

const StyledDot = styled.div`
  height: 10px;
  width: 10px;
  background: ${getColor('secondary_1')};
  border-radius: 50%;
  margin: 0 16px;
`

const StyledItem = styled.div`
  cursor: pointer;
  border-left: 8px solid;
  border-bottom: 1px solid;
  border-color: ${getColor('wheaty_1')};
  border-radius: 4px 0 0 4px;
  padding: 16px 16px 0;
  margin: 16px 0;
  margin-right: -24px;
  background: ${({ theme }) => theme.gradient};
  box-shadow: ${getStyle('shadows', 'big')};

  .divider {
    margin: 16px -16px;
    height: 1px;
    background-color: ${getColor('mono_2')};
  }

  transition: all 0.3s ease;

  &:hover {
    background-color: ${getColor('wheaty_4')}22;
  }
`

type RecipeListProps = {
  recipes: RecipeType[]
}

const RecipeList = ({ recipes }: RecipeListProps) => {
  const samedayers: RecipeType[] = []
  const overnights: RecipeType[] = []

  recipes.forEach((recipe) => {
    switch (recipe.btf) {
      case 'samedayer':
        samedayers.push(recipe)
        break
      case 'overnight':
        overnights.push(recipe)
        break
    }
  })

  return (
    <>
      <CardTitle>Straight dough Recipes</CardTitle>
      <div
        style={{
          margin: '16px',
        }}
      >
        <Row justify='center' align='middle'>
          <StyledDot />
          <Text fs='h4'>Same-day breads</Text>
          <StyledDot />
        </Row>
        <Row>
          <Text secondary>mix in the morning, bake in the afternoon</Text>
        </Row>
        {samedayers.map((recipe, i) => (
          <RecipeLink key={recipe.key} index={i} recipe={recipe} />
        ))}
        <Row justify='center' align='middle'>
          <StyledDot />
          <Text fs='h4'>Overnight breads</Text>
          <StyledDot />
        </Row>
        <Row>
          <Text.accent>mix in the evening, bake in the morning</Text.accent>
        </Row>
        {overnights.map((recipe, i) => (
          <RecipeLink
            key={recipe.key}
            index={i + samedayers.length}
            recipe={recipe}
          />
        ))}
      </div>
    </>
  )
}

const RecipeLink = ({
  recipe,
  index,
}: {
  recipe: RecipeType
  index: number
}) => {
  const { name, start, bulk, proof, key } = recipe

  const animateProps = useSpring({
    to: { transform: 'translateX(0)' },
    from: { transform: 'translateX(100%)' },
    config: {
      tension: 120,
      friction: 14,
      bounce: true,
    } as typeof config.gentle,
    delay: 200 * index,
  })

  return (
    <animated.div key={key} style={animateProps}>
      <Link href='/recipes/[key]' as={`/recipes/${key}`}>
        <StyledItem>
          <Row gutter={16} align='middle'>
            <Col>
              <Text fs='h4' style={{ lineHeight: 1 }}>
                {name}
              </Text>
            </Col>
          </Row>
          <SimpleTimeline start={start} bulk={bulk} proof={proof} />
        </StyledItem>
      </Link>
    </animated.div>
  )
}

export default RecipeList
