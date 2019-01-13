export const compose = (...mods) =>
  mods.reduce((a, b) => (...args) => a(b(...args)), arg => arg);

export default compose;
