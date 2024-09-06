export default class UserTable {
  elem = document.createElement("table");
  #rows = [];

  constructor(rows) {
    this.#rows = rows;
    this.elem = this.#createTable();
  }

  #createTable () {
    this.elem.innerHTML = this.#makeTableRow();
    this.elem.onclick = function (click) {
      click.target.closest('button').closest('tr').remove();
    };

    return this.elem;
  } 

  #makeTableRow() {
    return `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${this.#rows
          .map(row => `
            <tr>
              <td>${row.name}</td>
              <td>${row.age}</td>
              <td>${row.salary}</td>
              <td>${row.city}</td>
              <td><button>X</button></td>
            </tr>
            `)
          .join('')}
      </tbody>
    `;
  }
}
