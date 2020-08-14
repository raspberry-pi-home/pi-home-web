import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

import useFetch from '../../hooks/useFetch'
import Devices from '../../components/devices'

interface Device {
  pin: number
  label: string
  type: string
}

export default () => {
  const { data, loading } = useFetch<Device[]>('/api/devices?type=configured')

  return (
    <>
      {loading ? <CircularProgress /> : <Devices devices={data} />}
    </>
  )
}
