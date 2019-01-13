import React from 'react';

import { __contexts } from './_memo';
import listToSelector from '../utils/listToSelector';
import withDisplayName from '../utils/withDisplayName';

export const withContext = (name, selector) => BaseComponent => {
  if (selector instanceof Array) selector = listToSelector(selector);

  const WithContext = props => {
    const context = (__contexts[name] = React.createContext());
    return (
      <context.Provider value={selector(props)}>
        <BaseComponent {...props} />
      </context.Provider>
    );
  };

  return withDisplayName('withContext', BaseComponent)(WithContext);
};

export default withContext;
