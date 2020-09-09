import React from 'react'
import { Link } from 'react-router-dom'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import Devices from '../../components/devices'

const useStyles = makeStyles((theme: Theme) => createStyles({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

export default () => {
  const classes = useStyles()

  return (
    <>
      <Devices devicesPath="/api/devices" />
      <Link to="/devices/add">
        <Fab color="primary" aria-label="add" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Link>
    </>
  )
}
