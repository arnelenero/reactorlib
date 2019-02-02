import React, { Component } from 'react';

import withDisplayName from '../utils/withDisplayName';

export const withCallbacks = cbList => BaseComponent => {
  class WithCallbacks extends Component {
    constructor(props) {
      super(props);

      this.callbacks = {};
      for (let name in cbList) {
        this.callbacks[name] = (...args) => {
          const callback = cbList[name](this.props);
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
