import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import logo from './logo.png'

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: theme.spacing(3),
  },
  logo: {
    display: 'block',
    margin: 'auto',
  },
  text: {
    textAlign: 'center',
  },
}))

export default () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <img alt="Pi Home" className={classes.logo} src={logo} />
      <Typography variant="h5" className={classes.text} noWrap>
        Pi Home
      </Typography>
    </div>
  )
}
