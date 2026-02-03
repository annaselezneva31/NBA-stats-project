export const formatHeight = (str) => {
  const [feet, inch] = str.split("-").map((str) => parseInt(str, 10));

  const cm = ((feet * 12 + inch) * 2.54).toFixed(1);
  return `${feet}'${inch}" (${cm} cm)`;
};
