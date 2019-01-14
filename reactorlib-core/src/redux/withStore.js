import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { __redux } from './_memo';
import { withDisplayName } from '../utils/withDisplayName';

export const withStore = (entities, middleware = []) => BaseComponent => {
  const WithStore = props => {
    __redux.reducers = entities;
    __redux.store = createStore(
      combineReducers(entities),
      applyMiddleware(thunk, ...middleware)
    );

    return (
      <Provider store={__redux.store}>
        <BaseComponent {...props} />
      </Provider>
    );
  };

  return withDisplayName('withStore', BaseComponent)(WithStore);
};

export default withStore;
