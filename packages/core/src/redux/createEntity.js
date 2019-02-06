import { __actionCreators, __cancelled } from './_memo';

export const createEntity = (reactions, initialState = {}) => {
  const handlers = {};

  const registerHandler = (type, handler) => {
    __actionCreators[type] = payload => ({ type, payload });
    handlers[type] = handler;
  };

  const registerAsyncHandler = (type, handler, count) => {
    if (count === 3) registerHandler(`${type}Start`, handler[0]);
    __actionCreators[type] = (payload, txnId) => dispatch => {
      if (count === 3) dispatch(__actionCreators[`${type}Start`](payload));
      handler[count - 2](
        payload,
        nextPayload =>
          !__cancelled[txnId] &&
          dispatch(__actionCreators[`${type}End`](nextPayload))
      );
    };
    registerHandler(`${type}End`, handler[count - 1]);
  };

  for (let k in reactions) {
    if (__actionCreators[k] && process.env.NODE_ENV !== 'production')
      console.warn(`Multiple entities respond to action '${k}'. Intentional?`);

    if (typeof reactions[k] === 'function') {
      registerHandler(k, reactions[k]);
    } else if (reactions[k] instanceof Array) {
      registerAsyncHandler(k, reactions[k], reactions[k].length);
    }
  }

  return (state = initialState, { type, payload }) => {
    for (let k in handlers) {
      if (type === k) return handlers[k](state, payload);
    }
    return state;
  };
};

export default createEntity;
