import '@/styles/index.less'
import AppContext from '@/hooks/AppContext'
import type { AppType } from 'next/dist/shared/lib/utils'
import { BasicLayout } from 'layouts'
import { BRAND_NAME } from '@/styles/themes'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useSetDevice } from '@/hooks/useDeviceType'
import { trpc } from '@/utils/trpc'
import { httpBatchLink } from '@trpc/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import superjson from 'superjson'
import { ConfigProvider, theme as antdTheme } from 'antd'

const SetupLocatorUI = dynamic(() => import('@/utils/locator'), {
  ssr: false,
})

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '' // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

const MyApp: AppType = ({ Component, pageProps }) => {
  useSetDevice()

  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      transformer: superjson,
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            algorithm: antdTheme.darkAlgorithm,
            token: {
              colorPrimary: '#f6bb63',
              colorLink: '#122fd1',
              colorSuccess: '#52c41a',
              colorWarning: '#faad14',
              colorError: '#f5222d',
              fontSize: 14,
              colorTextHeading: '#ffe3b9',
              colorText: '#ffe3b9',
              colorTextSecondary: '#b2a086',
              colorBorder: '#484f55',
              borderRadius: 4,
            },
          }}
        >
          <AppContext>
            <SetupLocatorUI />
            <Head>
              <title>{BRAND_NAME}</title>
              <link rel='icon' href='/favicon.ico' />
              <link rel='preconnect' href='https://fonts.googleapis.com' />
              <link rel='preconnect' href='https://fonts.gstatic.com' />
              <meta
                name='viewport'
                content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
              />
            </Head>
            <BasicLayout>
              <Component {...pageProps} />
            </BasicLayout>
          </AppContext>
        </ConfigProvider>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default MyApp
