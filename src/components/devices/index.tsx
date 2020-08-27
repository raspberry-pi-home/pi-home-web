import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ToggleOnIcon from '@material-ui/icons/ToggleOn'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects'

import useLocalStorage from '../../hooks/useLocalStorage'

interface Device {
  pin: number
  label: string
  type: string
  status?: number
}

interface DevicesProps {
  devices: Device[] | null
}

interface DeviceProps {
  device: Device
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    card: {
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    cardActions: {
      height: 50,
    },
    cardActionsRoot: {
      padding: 8,
      display: 'inline-flex',
    },
    media: {
      height: 140,
      width: 140,
      display: 'block',
      margin: 'auto',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    actionItem: {
      display: 'inline-block',
    },
    link: {
      textDecoration: 'none',
      color: grey[500],
    },
  }),
)

const Device = ({ device }: DeviceProps) => {
  const classes = useStyles()
  const [deviceStatus, setDeviceStatus] = useState(device.status)
  const [serverBaseUrl] = useLocalStorage('serverBaseUrl')

  const onButtonClick = async (statusToSet: number) => {
    if (deviceStatus === statusToSet) {
      const res = await fetch(`${serverBaseUrl}/api/devices/change-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'pin': device.pin,
        }),
      })
      const { status } = await res.json()
      setDeviceStatus(status)
    }
  }

  let icon = null
  let iconStyles = { fontSize: 125 }
  let actions = null
  if (device.type === 'led') {
    if (deviceStatus) {
      // @ts-ignore TS2322
      iconStyles = { ...iconStyles, fill: '#ffef62' }
    }
    icon = <EmojiObjectsIcon style={iconStyles} />
    actions = (
      <>
        <Button size="small" color="primary" className={classes.actionItem} onClick={() => onButtonClick(1)}>
          Off
        </Button>
        <Typography variant="h5" component="h2" className={classes.actionItem}>
          <span className={classes.bullet}>•</span>
        </Typography>
        <Button size="small" color="primary" className={classes.actionItem} onClick={() => onButtonClick(0)}>
          On
        </Button>
      </>
    )
  } else if (device.type.toLowerCase().endsWith('button')) {
    icon = <ToggleOnIcon style={{ ...iconStyles, fill: '#2a3eb1' }} />
  }

  return (
    <Grid item lg={3} md={4} xs={6}>
      <Card className={classes.card}>
        <CardActionArea>
          <Link to={`/devices/view/${device.pin}`} className={classes.link}>
            {icon}
          </Link>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {device.label}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions} classes={{ root: classes.cardActionsRoot }}>
          {actions}
        </CardActions>
      </Card>
    </Grid>
  )
}

export default ({ devices } : DevicesProps) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {devices && devices.map(device => <Device key={device.pin} device={device} />)}
      </Grid>
    </div>
  )
}
