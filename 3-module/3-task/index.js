function camelize(str) {
  let strArr = str.split('-');

  let newStr = strArr.map(function (item, index) {
    if (index == 0) {
      return item;
    } else {
      return item[0].toUpperCase() + item.slice(1);
    }
  });

  let result = newStr.join('');
  
  return result;
}
