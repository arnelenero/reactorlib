import React from 'react';

import { __contexts } from './_memo';
import listToSelector from '../utils/listToSelector';
import withDisplayName from '../utils/withDisplayName';

export const withContext = (name, selector) => BaseComponent => {
  if (selector instanceof Array) selector = listToSelector(selector);

  const WithContext = props => {
    const context = (__contexts[name] = React.createContext(selector(props)));
    return (
      <context.Provider>
        <BaseComponent {...props} />
      </context.Provider>
    );
  };

  return withDisplayName('withContext', BaseComponent)(WithContext);
};

export default withContext;
