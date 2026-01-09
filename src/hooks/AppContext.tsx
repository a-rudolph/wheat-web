'use client'

import { SoundSettingProvider } from '@/components/SoundToggle'
import { theme } from '@/styles/themes'
import { ThemeProvider } from 'styled-components'
import { TimerProvider } from './useTimerContext'

const AppContext = ({ children }: { children: React.ReactNode }) => {
  return (
    <TimerProvider>
      <SoundSettingProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </SoundSettingProvider>
    </TimerProvider>
  )
}

export default AppContext
