import React from 'react';
import { withState, withDisplayName } from '@reactorlib/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export const __ViewablePasswordField = ({
  showPassword,
  setShowPassword,
  ...props
}) => {
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <TextField
      {...props}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={handleClickShowPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

const ViewablePasswordField = withState('showPassword', false)(
  __ViewablePasswordField
);
if (process.env.NODE_ENV !== 'production') {
  ViewablePasswordField.displayName = 'ViewablePasswordField';
}
export default ViewablePasswordField;
