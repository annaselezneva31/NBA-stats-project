export const formatWeight = (str) => {
  const kg = (parseInt(str, 10) * 0.45359237).toFixed(1);
  return `${str}lb (${kg}kg)`;
};
