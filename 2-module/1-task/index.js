function sumSalary(salaries) {
  let sum = 0;

  for (key in salaries) {
    let badNumberCheck = (typeof salaries[key] != "number" 
        || isNaN(salaries[key]) 
        || salaries[key] == Infinity 
        || salaries[key] == -Infinity);

    if (badNumberCheck == true) {
      salaries[key] = 0;
    }
    
    sum += salaries[key]; 

  }
  return sum;
}
