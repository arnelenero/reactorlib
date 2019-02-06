export const __redux = {
  store: null,
  reducers: {},
};

export const __actionCreators = {};

export let __txnId = 0;
export const __nextTxnId = () => __txnId++;
export const __cancelled = {};
