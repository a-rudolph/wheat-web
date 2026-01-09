import { useEffect, useState } from 'react'
import _isFunction from 'lodash/isFunction'

const PREFIX = 'wheatifully_'

const storageKeys = {
  timer_storage: 'timer_storage',
  recipe_storage: 'recipe_storage',
  sound_enabled: 'sound_enabled',
}

const useLocalStorage = <T, S = T>(
  key: keyof typeof storageKeys,
  initialValue: T | ((_storage?: S | null) => T)
) => {
  const storage_key = PREFIX + storageKeys[key]

  const [value, setValue] = useState<T>(() => {
    const getInitialValue = _isFunction(initialValue)
      ? initialValue
      : (value: T = initialValue) => value

    try {
      const item = localStorage.getItem(storage_key)

      return getInitialValue(item ? JSON.parse(item) : initialValue)
    } catch {
      return getInitialValue()
    }
  })

  useEffect(() => {
    localStorage.setItem(storage_key, JSON.stringify(value))
  }, [storage_key, value])

  return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>]
}

export default useLocalStorage
