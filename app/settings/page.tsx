'use client'

import dynamic from 'next/dynamic'

const UserSettings = dynamic(() => import('@/components/UserSettings'), {
  ssr: false,
})

export default function Page() {
  return <UserSettings />
}
