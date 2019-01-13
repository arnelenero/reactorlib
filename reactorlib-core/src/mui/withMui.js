import React from 'react';
import { create } from 'jss';
import expand from 'jss-plugin-expand';
import { JssProvider } from 'react-jss';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  MuiThemeProvider,
  createMuiTheme,
  jssPreset,
} from '@material-ui/core/styles';

import withDisplayName from '../utils/withDisplayName';

export const withMui = theme => BaseComponent => {
  const WithMui = props => {
    const muiTheme = createMuiTheme({
      typography: {
        useNextVariants: true,
      },
      ...theme,
    });
    const jss = create({
      plugins: [...jssPreset().plugins, expand()],
    });
    return (
      <>
        <CssBaseline />
        <MuiThemeProvider theme={muiTheme}>
          <JssProvider jss={jss}>
            <BaseComponent {...props} />
          </JssProvider>
        </MuiThemeProvider>
      </>
    );
  };

  return withDisplayName('withMui', BaseComponent)(WithMui);
};

export default withMui;
