import React from 'react';
import PropTypes from 'prop-types';
import { withState } from '@reactorlib/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export const __ViewablePasswordField = ({
  showPassword,
  setShowPassword,
  showButtonLabel = <Visibility />,
  hideButtonLabel = <VisibilityOff />,
  classes = {},
  ButtonProps = {},
  ...props
}) => {
  const handleClickToggle = () => setShowPassword(!showPassword);
  const toggleLabel = showPassword ? hideButtonLabel : showButtonLabel;
  const Toggle = typeof toggleLabel === 'string' ? Button : IconButton;

  return (
    <TextField
      {...props}
      {...classes}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Toggle
              size="small"
              {...ButtonProps}
              className={classes.toggle}
              onClick={handleClickToggle}
            >
              {toggleLabel}
            </Toggle>
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

ViewablePasswordField.propTypes = {
  showButtonLabel: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.string,
  ]),
  hideButtonLabel: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.string,
  ]),
  ButtonProps: PropTypes.object,
};

export default ViewablePasswordField;
