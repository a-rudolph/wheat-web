import { createContext, useContext } from 'react'
import { Button } from '@/components/atoms'
import Sound from '@/components/icons/Sound'
import useLocalStorage from '@/hooks/useLocalStorage'

export const SoundSettingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [on, setOn] = useLocalStorage('sound_enabled', false)

  return (
    <SettingContext.Provider value={{ on, setOn }}>
      {children}
    </SettingContext.Provider>
  )
}

type SettingContextType = {
  on: boolean
  setOn: React.Dispatch<React.SetStateAction<boolean>>
}

const initialContext: SettingContextType = {
  on: false,
  setOn: () => {},
}

const SettingContext = createContext<SettingContextType>(initialContext)

export const useSettingContext = () => {
  return useContext(SettingContext)
}

const SoundToggle = () => {
  const { on, setOn } = useSettingContext()

  return (
    <Button
      className='sound-btn'
      icon={<Sound on={on} />}
      onClick={() => {
        setOn((on) => !on)
      }}
    />
  )
}

export default SoundToggle
