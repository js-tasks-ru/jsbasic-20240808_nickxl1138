function makeFriendsList(friends) {
  let result = document.createElement("ul");
  result.innerHTML = friends
  .map(friend => `<li>${friend.firstName} ${friend.lastName}</li>`)
  .join('');

  return result;
}