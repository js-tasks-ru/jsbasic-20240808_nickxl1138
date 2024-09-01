function toggleText() {
  let button = document.querySelector('.toggle-text-button');
  button.onclick = function () {
    let result = (text.hidden == true) ? text.hidden = false : text.hidden = true;
    return result;
  };
}
