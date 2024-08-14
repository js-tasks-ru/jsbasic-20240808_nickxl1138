function factorial(n) {
  let result = n;

  if (n == 0) {
    return 1;
  }
  
  for (let i = n - 1; i > 0; i--) {
    result *= i;
  }

  return result;
}
