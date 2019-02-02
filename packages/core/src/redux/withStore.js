import React from 'react';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { __redux } from './_memo';
import { withDisplayName } from '../utils/withDisplayName';

export const withStore = (entities, middleware = []) => BaseComponent => {
  const WithStore = props => {
    __redux.reducers = entities;

    const enhance =
      (typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
      compose;
    __redux.store = createStore(
      combineReducers(entities),
      enhance(applyMiddleware(thunk, ...middleware))
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
