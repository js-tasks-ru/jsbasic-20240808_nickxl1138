function isEmpty(obj) {
  for (key in obj) {
    return !(key in obj);
  }
  return true;
}
