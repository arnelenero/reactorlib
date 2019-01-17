import React, { Component } from 'react';

import withDisplayName from '../utils/withDisplayName';

export const withEffect = (func, onlyOnMount) => BaseComponent => {
  class WithEffect extends Component {
    render() {
      return <BaseComponent {...this.props} {...this.state} />;
    }
  }

  const hook = function() {
    func(this.props);
  };
  WithEffect.prototype.componentDidMount = hook;
  if (!onlyOnMount) WithEffect.prototype.componentDidUpdate = hook;

  return withDisplayName('withEffect', BaseComponent)(WithEffect);
};

export default withEffect;
