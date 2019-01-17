import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { __actionCreators } from './_memo';
import { listToSelector } from '../utils/listToSelector';
import { withDisplayName } from '../utils/withDisplayName';

export const getPropsFromStore = (selector, actions) => BaseComponent => {
  if (selector instanceof Array) selector = listToSelector(selector);

  if (actions instanceof Array) {
    const list = actions;
    actions = dispatch =>
      bindActionCreators(
        list.reduce((map, k) => {
          map[k] = __actionCreators[k];
          return map;
        }, {}),
        dispatch
      );
  }

  const GetPropsFromStore = connect(
    selector,
    actions
  )(BaseComponent);

  return withDisplayName('getPropsFromStore', BaseComponent)(GetPropsFromStore);
};

export default getPropsFromStore;
