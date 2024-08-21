function showSalary(users, age) {
  let arr = [];
  let filterByAge = users.map(function(user) {
    if (user.age <= age) {
      arr.push(`${user.name}, ${user.balance}`);
    }
  });

  filterByAge = arr;

  return filterByAge.join('\n');
}