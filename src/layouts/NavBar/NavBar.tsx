import { Button, Text } from '@/components/atoms'
import { getColor, getStyle } from '@/styles/themes'
import _isArray from 'lodash/isArray'
import breakpoints from '@/constants/breakpoints'
import LeftArrow from '@/components/icons/LeftArrow'
import Link from 'next/link'
import { Row } from 'antd'
import styled from 'styled-components'
import { useRouter } from 'next/router'

const StyledRow = styled(Row)`
  background: ${({ theme }) => theme.gradient};
  width: 100%;
  height: 100%;
  padding: 12px;
`

const StyledNavBar = styled(Row)`
  width: 100vw;
  background-color: ${getColor('primary_1')};
  border-top: 1px solid ${getColor('mono_2')};
  box-shadow: ${getStyle('shadows', 'up')};
  position: fixed;
  bottom: 0;
  z-index: 10;

  @media screen and (min-width: ${breakpoints.sm}px) {
    display: none;
  }
`

const getTitle = (key?: string | string[]) => {
  if (!key) return 'recipes'

  if (_isArray(key)) return key

  return (key as string).replace(/-/g, ' ')
}

export default function NavBar({ children }: { children?: React.ReactNode }) {
  const router = useRouter()

  const title = getTitle(router?.query?.key)
  const isHome = router.pathname === '/'

  return (
    <StyledNavBar>
      <StyledRow justify='space-between' align='middle'>
        {children || (
          <>
            <Text fs='h4' weight={500}>
              {title}
            </Text>
            <span>
              {isHome || (
                <Link href='/'>
                  <Button type='ghost'>
                    <LeftArrow size={32} />
                  </Button>
                </Link>
              )}
            </span>
          </>
        )}
      </StyledRow>
    </StyledNavBar>
  )
}
