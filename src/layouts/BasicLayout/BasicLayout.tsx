'use client'

import breakpoints from '@/constants/breakpoints'
import Card from '@/components/atoms/Card'
import { getColor } from '@/styles/themes'
import Header from '@/layouts/Header'
import styled from 'styled-components'

type BasicLayoutProps = {
  children: React.ReactNode
}

const StyledDiv = styled.div`
  min-height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${breakpoints.sm}px) {
    padding-bottom: 60px;
  }

  background-color: ${getColor('primary_1')};

  font-size: 100%; /*16px*/

  font-family: ${({ theme }) => {
    return theme.font
  }};

  font-weight: 400;
  line-height: 1.5;
  color: ${getColor('text_1')};

  p {
    margin-bottom: 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 3rem 0 1.38rem;
    font-family: ${({ theme }) => theme.font};
    font-weight: 400;
    line-height: 1.3;
  }

  h1 {
    margin-top: 0;
  }

  .page-content {
    flex: 1;
    display: flex;
    justify-content: flex-end;

    @media screen and (min-width: ${breakpoints.sm}px) {
      justify-content: space-around;
    }
  }
`

const BasicLayout = ({ children }: BasicLayoutProps) => {
  return (
    <StyledDiv>
      <Header />
      <div className='page-content'>{children}</div>
    </StyledDiv>
  )
}

const LayoutCard = styled(Card)`
  &.atom-card {
    width: 100vw;
    max-width: 820px;
    min-height: 60vh;
    padding: 0;
    padding-bottom: 64px;
    overflow: hidden;
    border-radius: 0px;

    @media screen and (min-width: ${breakpoints.sm}px) {
      width: max-content;
      min-width: 480px;
      margin-top: 24px;
      padding-bottom: 24px;
      border-radius: 4px;
    }
  }
`

BasicLayout.Card = LayoutCard

export default BasicLayout
