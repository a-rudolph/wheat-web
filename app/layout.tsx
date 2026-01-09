import '@/styles/index.less'
import { BRAND_NAME, theme } from '@/styles/themes'
import { ConfigProvider, theme as antdTheme } from 'antd'
import TrpcProvider from './providers'
import ClientProviders from './ClientProviders'
import StyledComponentsRegistry from './registry'

export const metadata = {
  title: BRAND_NAME,
  applicationName: `${BRAND_NAME} - bread coach`,
  description: 'wheatifully, bread coach; baking scheduling tool',
  manifest: '/api/manifest',
  themeColor: theme.colors.primary_1,
  viewport: {
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    shrinkToFit: 'no',
    userScalable: 'no',
    viewportFit: 'cover',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: `${BRAND_NAME} - bread coach`,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: [
      { url: '/icons/apple-icon-152x152.png', sizes: '152x152' },
      { url: '/icons/apple-icon-180x180.png', sizes: '180x180' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Lato:ital@1&family=Mukta+Mahee&display=swap'
          rel='stylesheet'
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <TrpcProvider>
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
              <ClientProviders>{children}</ClientProviders>
            </ConfigProvider>
          </TrpcProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
