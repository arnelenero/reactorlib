import getDisplayName from './getDisplayName';

export const withDisplayName = (name, base) => BaseComponent => {
  if (process.env.NODE_ENV !== 'production') {
    BaseComponent.displayName = `${name}(${getDisplayName(base)})`;
  }
  return BaseComponent;
};

export default withDisplayName;
