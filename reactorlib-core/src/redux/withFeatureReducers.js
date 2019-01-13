import { combineReducers } from 'redux';

import { __redux } from './_memo';

export const withFeatureReducers = reducers => BaseComponent => {
  __redux.reducers = { ...__redux.reducers, ...reducers };
  if (__redux.store)
    __redux.store.replaceReducer(combineReducers(__redux.reducers));

  return BaseComponent;
};

export default withFeatureReducers;
