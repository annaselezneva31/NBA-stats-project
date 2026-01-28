export const addSpaceBeforeUpper = (str) => {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
};
