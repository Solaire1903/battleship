/**
 * Returns a random integer between min and max (both inclusive)
 * @param {Number} min The minimum value of the random integer
 * @param {Number} max he maximum value of the random integer
 * @returns The random integer between min and max
 */
const getRandomInt = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};

export default getRandomInt;
