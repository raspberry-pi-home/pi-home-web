import React from 'react'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import ErrorIcon from '@material-ui/icons/ReportProblem'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

interface CustomInputProps extends Omit<TextFieldProps, 'variant' | 'error' | 'name'> {
  name: string,
  className?: string,
  error?: any
  variant?: string,
  maxLength?: number
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  errorIcon: {
    color: '#ff1818',
  },
}))

export default ({ className, error, inputProps = {}, variant = 'filled', ...textFieldProps }: CustomInputProps) => {
  const classes = useStyles()

  return (
    <TextField
      data-id="custom-input"
      {...textFieldProps}
      className={className}
      variant={variant as any}
      fullWidth
      margin="dense"
      error={!!error}
      helperText={error}
      inputProps={{
        maxLength: inputProps.maxLength,
      }}
      InputProps={{
        endAdornment: error && (
          <InputAdornment position="end">
            <ErrorIcon className={classes.errorIcon}/>
          </InputAdornment>
        ),
      }}
    />
  )
}
