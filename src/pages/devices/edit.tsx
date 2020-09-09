import React, { useEffect, useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'

import useLocalStorage from '../../hooks/useLocalStorage'
import Snackbar from '../../components/snackbar'
import DeviceSettings from '../../components/devices/settings'

interface Device {
  pin: number
  label: string
  type: string
  status?: number
}

export default () => {
  const { deviceId } = useParams()
  const [serverBaseUrl] = useLocalStorage('serverBaseUrl')
  const [data, setData] = useState<Device | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)

    const data = await fetch(`${serverBaseUrl}/api/devices/${deviceId}`)

    if (data.ok) {
      setData(await data.json())
    } else {
      setError(await data.text())
    }

    setLoading(false)
  }, [serverBaseUrl, deviceId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
      <Snackbar message={error} severity="error" onClose={() => setError(null)}/>
      {!error ? loading ? <CircularProgress /> : <DeviceSettings device={data} /> : null}
    </>
  )
}
