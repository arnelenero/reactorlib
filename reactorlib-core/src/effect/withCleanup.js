import React, { Component } from 'react';

import withDisplayName from '../utils/withDisplayName';

export const withCleanup = func => BaseComponent => {
  class WithCleanup extends Component {
    render() {
      return <BaseComponent {...this.props} {...this.state} />;
    }
  }

  const hook = function() {
    func(this.props);
  };
  WithCleanup.prototype.componentWillUnmount = hook;

  return withDisplayName('withCleanup', BaseComponent)(WithCleanup);
};

export default withCleanup;
