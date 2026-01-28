export const transmitTypeOfSeason = (str) => {
  const typesOfSeason = {
    RegularSeason: "Regular Season",
    PostSeason: "Playoffs",
    AllStarSeason: "All Star",
    CollegeSeason: "",
    ShowcaseSeason: "",
  };

  return typesOfSeason[str];
};
