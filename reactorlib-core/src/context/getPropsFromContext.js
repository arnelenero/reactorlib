import React from 'react';

import { __contexts } from './_memo';
import listToSelector from '../utils/listToSelector';
import withDisplayName from '../utils/withDisplayName';

export const getPropsFromContext = (name, selector) => BaseComponent => {
  if (selector instanceof Array) selector = listToSelector(selector);

  const GetPropsFromContext = props => {
    const context = __contexts[name];
    if (!context) {
      if (process.env.NODE_ENV !== 'production')
        console.warn(`Expected context '${name}' was not found.`);
      return <BaseComponent {...props} />;
    }

    return (
      <context.Consumer>
        {value => <BaseComponent {...props} {...selector(value)} />}
      </context.Consumer>
    );
  };

  return withDisplayName('getPropsFromContext', BaseComponent)(
    GetPropsFromContext
  );
};

export default getPropsFromContext;
