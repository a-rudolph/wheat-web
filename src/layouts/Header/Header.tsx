'use client'

import { BRAND_NAME } from '@/styles/themes'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import LogoIcon from '@/components/icons/Logo'
import { Row } from 'antd'
import styled from 'styled-components'
import { Text } from '@/components/atoms'

const MenuDropdown = dynamic(() => import('@/components/MenuDropdown'), {
  ssr: false,
})

const StyledRow = styled(Row)`
  cursor: pointer;

  .logo {
    margin-right: 12px;
  }
`

export default function Header() {
  return (
    <MenuDropdown>
      <Link href='/' as='/'>
        <StyledRow align='middle'>
          <div className='logo'>
            <LogoIcon />
          </div>
          <Text fs='h4' color='wheaty_1' weight={500}>
            {BRAND_NAME}
          </Text>
        </StyledRow>
      </Link>
    </MenuDropdown>
  )
}
