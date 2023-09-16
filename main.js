import './style.css';

// Toggler definition
import './style.css';

// Toggler definition
let hasAccount = false;
let authorised = false;
export let loggedInUserName;
let date;

// DB
const accounts = [];

// DOM . Receive document nodes

const userName = document.querySelector("[name='nickname']");
const userPassword = document.querySelector("[name='password']");
const sendBtn = document.querySelector('#send-btn');

const btns = document.querySelectorAll('.nav-link');

btnsReview(hasAccount, accounts, btns);

// Research
const loginBtns = [...btns].filter(
  (btn) => toLowerCase(btn.textContent) === 'login'
);
const loginBtn = getFirst(loginBtns);

const profileBtns = [...btns].filter(
  (btn) => toLowerCase(btn.textContent) === 'profile'
);
export const profileBtn = getFirst(profileBtns);

// Handlers
if (sendBtn) {
  sendBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const nickname = userName.value;
    const password = userPassword.value;
    date = new Date();
    const newUser = { nickname, password, date };

    accounts.push(newUser);

    hasAccount = true;
    btnsReview(hasAccount, accounts, btns, authorised);
  });
}

if (loginBtn) {
  loginBtn.addEventListener('click', (e) => {
    const account = getAccount(accounts, { userName, userPassword, date });
    if (!account) return console.log('There is no valid data');

    clearInputs(userName, userPassword);
    authorised = true;
    loggedInUserName = account.nickname;
    date = account.date;
    localStorage.setItem('loggedInUserName', loggedInUserName);
    localStorage.setItem('date', date.toISOString());
    console.log(loggedInUserName);
    console.log(date);

    btnsReview(hasAccount, accounts, btns, authorised);
  });
}
if (profileBtn) {
  profileBtn.addEventListener('click', () => {
    window.location.href = './pages/profile.html';
  });
}

function btnsReview(hasAccount, accounts, btns, authorised) {
  if (!hasAccount || accounts.length === 0) return;

  for (const btn of btns) {
    const btnsText = btn.textContent;
    if (!authorised && toLowerCase(btnsText) === 'profile') continue;

    btn.removeAttribute('disabled');
  }
}
// export function getLoggedInUser() {
//   authorised = true;
//   if (authorised) {
//     const loggedInUser = accounts.find(
//       (user) => user.nickname === storedUserName
//     );

//     return loggedInUser;
//   } else {
//     return null;
//   }
// }

function getAccount(accounts, { userName, userPassword, date }) {
  return accounts.find(
    (account) =>
      account.nickname === userName.value &&
      account.password === userPassword.value &&
      account.date === date
  );
}

// Utils functions

function toLowerCase(str) {
  return str.toLowerCase();
}

function getFirst(arr) {
  return arr[0];
}

function clearInputs(...inputs) {
  for (const input of inputs) {
    input.value = '';
  }
}
// ____________________________________________________
export function createProfileCard(user) {
  const profileCard = document.createElement('div');
  profileCard.classList.add('profile-card');

  const storedUserDate = localStorage.getItem('date');
  const registrationDate = new Date(storedUserDate);

  // Formating date
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  const formattedDate = registrationDate.toLocaleDateString('en-US', options);
  // _________________________________________________________________________

  const profilePhoto = document.createElement('img');
  profilePhoto.classList.add('profile-photo');
  profilePhoto.src =
    'https://news.italy24.press/content/uploads/2023/04/25/ecb9dcc2a0.jpg ';
  profilePhoto.alt = 'https://cdn-icons-png.flaticon.com/512/25/25400.png';

  const profileName = document.createElement('h2');
  profileName.classList.add('profile-name');
  profileName.textContent = `Name: ${user.nickname}`;

  const profileRegistrationDate = document.createElement('p');
  profileRegistrationDate.classList.add('profile-registration-date');
  profileRegistrationDate.textContent = `Registration Date: ${formattedDate}`;

  profileCard.appendChild(profilePhoto);
  profileCard.appendChild(profileName);
  profileCard.appendChild(profileRegistrationDate);

  return profileCard;
}
