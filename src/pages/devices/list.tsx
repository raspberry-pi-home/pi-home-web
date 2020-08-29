import React, { useEffect, useCallback, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

import useLocalStorage from '../../hooks/useLocalStorage'
import Devices from '../../components/devices'
import { initiateSocket, disconnectSocket, subscribeTo } from '../../utils/socket'

interface Device {
  pin: number
  label: string
  type: string
}

export default () => {
  const [serverBaseUrl] = useLocalStorage('serverBaseUrl')
  const [data, setData] = useState<Device[] | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(() => {
    setLoading(true)

    fetch(`${serverBaseUrl}/api/devices`)
      .then((response) => response.json())
      .then((response) => {
        setData(response)
        setLoading(false)
      }).catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [serverBaseUrl])

  useEffect(() => {
    fetchData()

    if (serverBaseUrl) {
      initiateSocket(`${serverBaseUrl}`)

      subscribeTo('changeDeviceStatus', () => {
        // TODO: improve this
        fetchData()
      })
    }

    return () => {
      disconnectSocket()
    }
  }, [fetchData, serverBaseUrl])

  return (
    <>
      {!error && loading ? <CircularProgress /> : <Devices devices={data} />}
    </>
  )
}
