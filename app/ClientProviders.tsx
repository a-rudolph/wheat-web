'use client'

import AppContext from '@/hooks/AppContext'
import { BasicLayout } from 'layouts'
import dynamic from 'next/dynamic'

const SetupLocatorUI = dynamic(() => import('@/utils/locator'), {
  ssr: false,
})

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppContext>
      <SetupLocatorUI />
      <BasicLayout>{children}</BasicLayout>
    </AppContext>
  )
}
