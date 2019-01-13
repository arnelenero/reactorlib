import { __actionCreators } from './_memo';

export const generateReducer = (reactions, initialState = {}) => {
  const handlers = {};

  const registerHandler = (type, handler) => {
    __actionCreators[type] = payload => ({ type, payload });
    handlers[type] = handler;
  };

  for (let k in reactions) {
    if (__actionCreators[k] && process.env.NODE_ENV !== 'production')
      console.warn(
        `Multiple reducers are handling action '${k}'. Intentional?`
      );

    if (typeof reactions[k] === 'function') {
      registerHandler(k, reactions[k]);
    } else if (reactions[k] instanceof Array) {
      __actionCreators[k] = payload => dispatch => {
        reactions[k][0](payload, nextPayload =>
          dispatch(__actionCreators[`${k}Done`](nextPayload))
        );
      };
      registerHandler(`${k}Done`, reactions[k][1]);
    }
  }

  const reducer = (state = initialState, { type, payload }) => {
    for (let k in handlers) {
      if (type === k) return handlers[k](state, payload);
    }
    return state;
  };

  return reducer;
};

export default generateReducer;
