import React, { Component } from 'react';

import withDisplayName from '../utils/withDisplayName';

export const withState = (name, initialState) => BaseComponent => {
  const updaterName = `set${name.charAt(0).toUpperCase() + name.slice(1)}`;

  class WithState extends Component {
    state = {
      value:
        typeof initialState === 'function'
          ? initialState(this.props)
          : initialState,
    };

    update = newValue =>
      this.setState(({ value }) => ({
        value: typeof newValue === 'function' ? newValue(value) : newValue,
      }));

    render() {
      const props = {
        ...this.props,
        [name]: this.state.value,
        [updaterName]: this.update,
      };
      return <BaseComponent {...props} />;
    }
  }

  return withDisplayName('withState', BaseComponent)(WithState);
};

export default withState;
