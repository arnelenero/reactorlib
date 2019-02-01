import React, { Component } from 'react';

import withDisplayName from '../utils/withDisplayName';

export const withState = (...args) => BaseComponent => {
  const _state = typeof args[0] === 'string' ? { [args[0]]: args[1] } : args[0];

  class WithState extends Component {
    update = (name, value) =>
      this.setState(state => ({
        [name]: typeof value === 'function' ? value(state[name]) : value,
      }));

    constructor(props) {
      super(props);

      for (let name in _state) {
        if (typeof _state[name] === 'function')
          _state[name] = _state[name](props);
      }
      this.state = _state;

      this.updaters = {};
      for (let stateName in _state) {
        const name = `set${stateName.charAt(0).toUpperCase() +
          stateName.slice(1)}`;
        this.updaters[name] = value => this.update(stateName, value);
      }
    }

    render() {
      const props = {
        ...this.props,
        ...this.state,
        ...this.updaters,
      };
      return <BaseComponent {...props} />;
    }
  }

  return withDisplayName('withState', BaseComponent)(WithState);
};

export default withState;
