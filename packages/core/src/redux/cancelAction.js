import { __cancelled } from './_memo';

export const cancelAction = txnId => {
  __cancelled[txnId] = true;
};

export default cancelAction;
