import React, {
  createContext,
  createElement,
  useContext,
  useEffect,
} from 'react'
import { getNow } from '@/utils/formatTime'
import useLocalStorage from './useLocalStorage'

type TimerContextType = {
  keyRecipe: { key: string } | null
  timer: Timer | null
  setTimer: React.Dispatch<React.SetStateAction<Timer | null>>
  setKeyRecipe: React.Dispatch<React.SetStateAction<{ key: string } | null>>
}

const DEPRECATED_TIMER_STORAGE = 'timer'
const DEPRECATED_UNDEFINED = 'wheatifully_undefined'

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [timer, setTimer] = useLocalStorage<Timer | null>(
    'timer_storage',
    (timer) => {
      if (!timer || timer?.endTime <= getNow()) {
        return null
      }

      return timer
    }
  )

  useEffect(() => {
    // remove deprecated timer storage from local storage
    localStorage.removeItem(DEPRECATED_TIMER_STORAGE)
    localStorage.removeItem(DEPRECATED_UNDEFINED)
  }, [])

  const [keyRecipe, setKeyRecipe] = useLocalStorage<{ key: string } | null>(
    'recipe_storage',
    null
  )

  return createElement(
    TimerContext.Provider,
    {
      value: { timer, setTimer, keyRecipe, setKeyRecipe },
    },
    children
  )
}

const initialContext: TimerContextType = {
  timer: null,
  setTimer: () => {},
  keyRecipe: null,
  setKeyRecipe: () => {},
}

const TimerContext = createContext<TimerContextType>(initialContext)

export const useTimerContext = () => {
  return useContext(TimerContext)
}
