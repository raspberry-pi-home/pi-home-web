import { useState, useEffect } from 'react'

import useLocalStorage from './useLocalStorage'

export default function useFetch<T>(url: string): { data: T | null, error: Error | null, loading: boolean } {
  const [serverBaseUrl] = useLocalStorage('serverBaseUrl')
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true)
      try {
        const res = await fetch(`${serverBaseUrl}${url}`)
        const data = await res.json()
        setData(data)
        setLoading(false)
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }
    fetchData()
  }, [serverBaseUrl, url])

  return { data, error, loading }
}
