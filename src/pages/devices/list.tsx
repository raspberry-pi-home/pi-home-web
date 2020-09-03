import React, { useEffect, useCallback, useState, SyntheticEvent, Fragment } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Alert from '@material-ui/lab/Alert'

import useLocalStorage from '../../hooks/useLocalStorage'
import Devices from '../../components/devices'
import { initiateSocket, disconnectSocket, subscribeTo } from '../../utils/socket'

interface Device {
  pin: number
  label: string
  type: string
}

interface MessageData {
  pin?: number
  status?: boolean
}

interface Message {
  eventName: string
  data: MessageData
}

export default () => {
  const [serverBaseUrl] = useLocalStorage('serverBaseUrl')
  const [message, setMessage] = useState<Message | null>(null)
  const [data, setData] = useState<Device[] | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(() => {
    setMessage(null)
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

      subscribeTo('all', (eventName: string, data: object) => setMessage({ eventName, data }))
    }

    return () => {
      disconnectSocket()
    }
  }, [fetchData, serverBaseUrl])

  const handleCloseNotification = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setError(null)
  }

  if (message && data) {
    switch (message.eventName) {
    case 'deviceStatusChanged':
      const devices = data.map((device) => {
        if (device.pin === message.data.pin) {
          return {
            ...device,
            status: message.data.status,
          }
        }
        return device
      })

      setData(devices)
      setMessage(null)
      break
    default:
      break
    }
  }

  return (
    <>
      {error &&
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          action={
            <Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseNotification}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Fragment>
          }
        >
          <Alert onClose={handleCloseNotification} severity="error" elevation={6} variant="filled">
            {`${error}`}
          </Alert>
        </Snackbar>
      }
      {!error && loading ? <CircularProgress /> : <Devices devices={data} />}
    </>
  )
}
