import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { __actionCreators, __nextTxnId } from './_memo';
import { listToSelector } from '../utils/listToSelector';
import { withDisplayName } from '../utils/withDisplayName';

export const getPropsFromStore = (selector, actions) => BaseComponent => {
  if (selector instanceof Array) selector = listToSelector(selector);

  let list = [];
  if (actions instanceof Array) {
    list = actions;
    actions = dispatch =>
      bindActionCreators(
        list.reduce((map, k) => {
          map[k] = __actionCreators[k];
          return map;
        }, {}),
        dispatch
      );
  }

  const assignTxnIds = props => {
    const newProps = { ...props };
    list.forEach(action => {
      newProps[action] = payload => {
        const txnId = __nextTxnId();
        props[action](payload, txnId);
        return txnId;
      };
    });
    return newProps;
  };

  const Wrapper = props => <BaseComponent {...assignTxnIds(props)} />;

  const GetPropsFromStore = connect(
    selector,
    actions
  )(Wrapper);

  return withDisplayName('getPropsFromStore', BaseComponent)(GetPropsFromStore);
};

export default getPropsFromStore;
