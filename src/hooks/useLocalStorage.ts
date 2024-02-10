import { useEffect, useState } from 'react'
import { JSONValue } from '../types'

const useLocaleStorage = <T>(key: string, defaultValue: JSONValue): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    const localValue = localStorage.getItem(key)

    if (localValue) {
      return JSON.parse(localValue)
    } else {
      return defaultValue
    }
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default useLocaleStorage
