import React from 'react'
import { Redirect } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'

import useFetch from '../../hooks/useFetch'
import useLocalStorage from '../../hooks/useLocalStorage'
import Devices from '../../components/devices'

interface Device {
  pin: number
  label: string
  type: string
}

export default () => {
  const [serverBaseUrl] = useLocalStorage('serverBaseUrl')

  if (!serverBaseUrl) {
    return <Redirect to={'/welcome'} />
  }

  const { data, loading } = useFetch<Device[]>('/api/devices?type=led')

  return (
    <>
      {loading ? <CircularProgress /> : <Devices devices={data} />}
    </>
  )
}
