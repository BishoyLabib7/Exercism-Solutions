export const keep = (array, fun) => {
  return array.filter(fun);
};

export const discard = (array, fun) => {
  return array.filter((element) => !fun(element));
};