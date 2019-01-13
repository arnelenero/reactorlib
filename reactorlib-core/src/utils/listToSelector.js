export const listToSelector = list => source =>
  list.reduce((map, k) => {
    map[k] = source[k];
    return map;
  }, {});

export default listToSelector;
