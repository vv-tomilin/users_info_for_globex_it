import getUsers from './getUsers.js';
import userTemplate from './userTemplate.js';

export default function drawUsers(url) {
  const searchField = document.getElementById('search-input');
  const usersWrapper = document.querySelector('.users');

  createUsersCards(url, usersWrapper);

  searchField.addEventListener('input', (event) => {
    const value = event.target.value;
    const serchUrl = `${url}?term=${value}`;

    if (value) {
      usersWrapper.innerHTML = '';
      createUsersCards(serchUrl, usersWrapper, value);
    } else {
      createUsersCards(url, usersWrapper, value);
    }
  });

  usersWrapper.addEventListener('click', popupToggle);
}

function popupToggle(event) {
  event.preventDefault();
  const target = event.target;

  const userId = target.dataset.userId;
  const userPopupId = target.dataset.userPopupId;
  const popupCloseId = target.dataset.popupCloseId;
  const userName = target.closest('.users__user-name');
  const userIcon = target.closest('.users__icon');
  const userInfoWrapper = target.closest('.users__user-info-wrapper');

  if (userId || userPopupId || popupCloseId || userName || userIcon || userInfoWrapper) {
    if (userId) {
      openPopup(userId);
    } else if (target.className === 'users__user-name') {
      const id = target.parentNode.dataset.userId;
      openPopup(id);
    } else if (
      target.className === 'users__icon' ||
      target.className === 'users__info-item' ||
      target.className === 'users__user-info-wrapper'
    ) {
      const id = target.parentNode.parentNode.dataset.userId;
      openPopup(id);
    } else if (popupCloseId) {
      const userInfoPopup = document.querySelector(`[data-user-popup-id=${popupCloseId}]`);
      userInfoPopup.classList.add('hide');
    } else if (userPopupId) {
      const userInfoPopup = document.querySelector(`[data-user-popup-id=${userPopupId}]`);
      userInfoPopup.classList.add('hide');
    }
  }
}

function openPopup(id) {
  const userInfoPopup = document.querySelector(`[data-user-popup-id=${id}]`);
  userInfoPopup.classList.remove('hide');
}

async function createUsersCards(url, wrapperNode, value) {
  const users = await getUsers(url);

  users.forEach((elem) => {
    const userCard = document.createElement('div');
    userCard.classList.add('users__user-wrapper');
    userCard.innerHTML = userTemplate(elem, value);

    wrapperNode.appendChild(userCard);
  });
}
