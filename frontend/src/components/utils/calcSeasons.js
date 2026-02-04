export const calcSeasons = () => {
  const now = new Date();
  const currentYear =
    now.getMonth() < 10 ? now.getFullYear() - 1 : now.getFullYear();
  let seasons = [];
  for (let year = 1946; year <= currentYear; year++) {
    seasons.push(year + "-" + String(year + 1).slice(-2));
  }
  return seasons;
};
