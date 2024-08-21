function getMinMax(str) {
  let arrOfNumbers = str
  .split(' ')
  .filter(item => !isNaN(+item))
  .sort((a, b) => a - b);

  return {
    min: +arrOfNumbers[0],
    max: +arrOfNumbers.at(-1)
  };
}