import { combineReducers } from 'redux';

import { __redux } from './_memo';

export const withFeatureStore = entities => BaseComponent => {
  __redux.reducers = { ...__redux.reducers, ...entities };
  if (__redux.store)
    __redux.store.replaceReducer(combineReducers(__redux.reducers));

  return BaseComponent;
};

export default withFeatureStore;
