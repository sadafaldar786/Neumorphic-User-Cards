const getUsersButton = document.querySelector('.get-users-btn');
const userCardRow1 = document.getElementById('user-card-row-1');
const userCardRow2 = document.getElementById('user-card-row-2');
const loader = document.getElementById('loader');

const API_URL = 'https://reqres.in/api/users?page=1';

getUsersButton.addEventListener('click', async () => {
  showLoader();
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    renderUserCards(data.data);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
  hideLoader();
});

function renderUserCards(users) {
  userCardRow1.innerHTML = '';
  userCardRow2.innerHTML = '';
  const firstRowUsers = users.slice(0, 3);
  const secondRowUsers = users.slice(3, 6);
  renderRowUsers(userCardRow1, firstRowUsers);
  renderRowUsers(userCardRow2, secondRowUsers);
}

function renderRowUsers(row, users) {
  users.forEach(user => {
    const userCard = document.createElement('div');
    userCard.classList.add('user-card');
    userCard.innerHTML = `
      <img src="${user.avatar}" alt="${user.first_name} ${user.last_name}">
      <h3>${user.first_name} ${user.last_name}</h3>
      <p>Email: ${user.email}</p>
    `;
    row.appendChild(userCard);
  });
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}
