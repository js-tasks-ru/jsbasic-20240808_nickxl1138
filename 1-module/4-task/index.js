function checkSpam(str) {
  let strLowCase = str.toLowerCase();

  if (strLowCase.indexOf('1xbet') != -1 || strLowCase.indexOf('xxx') != -1) {
    return true;
  }
  return false;
}
