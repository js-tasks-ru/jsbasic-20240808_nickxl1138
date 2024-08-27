function highlight(table) {
  let rows = table.querySelectorAll('tbody > tr');

  for (let row of rows) {
    let dataCheck = row.cells[3].dataset.available;
    let age = +row.cells[1].innerHTML;
    let gender = row.cells[2].innerHTML;
    
    switch (dataCheck) {
    case 'true':
      row.classList.add('available');
      break;
    case 'false':
      row.classList.add('unavailable');
      break;
    default:
      row.hidden = true;
      break;
    }

    if (gender == 'm') {
      row.classList.add('male');
    } else {
      row.classList.add('female');
    }

    if (age < 18) {
      row.style.textDecoration = 'line-through';
    }
  }
}