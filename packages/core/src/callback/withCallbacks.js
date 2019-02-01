import React, { Component } from 'react';

import withDisplayName from '../utils/withDisplayName';

export const withCallbacks = (...args) => BaseComponent => {
  const _cb = typeof args[0] === 'string' ? { [args[0]]: args[1] } : args[0];

  class WithCallbacks extends Component {
    constructor(props) {
      super(props);

      this.callbacks = {};
      for (let name in _cb) {
        this.callbacks[name] = (...args) => {
          const callback = _cb[name](props);
          if (typeof callback !== 'function')
            throw new Error(
              `Callback '${name}' was not declared properly using higher-order function`
            );
          return callback(...args);
        };
      }
    }

    render() {
      const props = {
        ...this.props,
        ...this.callbacks,
      };
      return <BaseComponent {...props} />;
    }
  }

  return withDisplayName('withCallbacks', BaseComponent)(WithCallbacks);
};

export default withCallbacks;
