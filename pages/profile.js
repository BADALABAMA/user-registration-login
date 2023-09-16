import './profile.css';
import { createProfileCard } from '../main.js';

document.addEventListener('DOMContentLoaded', () => {
  const storedUserName = localStorage.getItem('loggedInUserName');

  const profileContainer = document.getElementById('profile-container');
  const logoutButton = document.getElementById('logout-btn');

  const user = { nickname: storedUserName };
  console.log(user);

  if (user) {
    const profileCard = createProfileCard(user);
    profileContainer.innerHTML = ''; // Clear profile constainer before add new profile
    profileContainer.appendChild(profileCard);
    console.log(user);
  }

  logoutButton.addEventListener('click', () => {
    window.location.href = '../index.html';
  });
});
