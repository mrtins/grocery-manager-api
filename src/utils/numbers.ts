export const generateRandomDecimal = (
  minValue = 0,
  maxValue = 100,
  precision = 2,
) => {
  const rand =
    Math.random() < 0.5
      ? (1 - Math.random()) * (maxValue - minValue) + minValue
      : Math.random() * (maxValue - minValue) + minValue; // could be min or max or anything in between

  const power = Math.pow(10, precision);

  return Math.floor(rand * power) / power;
};
