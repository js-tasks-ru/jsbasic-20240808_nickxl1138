function getMinMax(str) {
  let strToArr = str.split(' ');
  let arrOfNumbers = [];

  strToArr.map(function(item) {
    if (!isNaN(+item)) {
      arrOfNumbers.push(+item);
    }
  });

  arrOfNumbers.sort((a, b) => a - b);

  let result = {
    min: arrOfNumbers[0],
    max: arrOfNumbers.at(-1)
  };

  return result;

}
