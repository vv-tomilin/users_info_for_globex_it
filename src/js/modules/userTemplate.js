export default function userTemplate(userData) {
  const { name, phone, email, address, position_name, department, hire_date } = userData;

  const cutPositionName = cutString(position_name, 42);
  const cutDepartment = cutString(department, 42);

  const id = name.split(' ').join('_') + phone.split(' ').join('').replace(/[()]/g, '');

  return `
        <div data-user-id=${id} class="users__user">
          <div class="users__user-name">${name}</div>
          <div class="users__user-info-wrapper">
            <img class="users__icon" src="../../assets/img/phone.svg">
            <div class="users__info-item">${phone}</div>
          </div>
          <div class="users__user-info-wrapper">
            <img class="users__icon" src="../../assets/img/email.svg">
            <div class="users__info-item">${email}</div>
          </div>
        </div>
        <div data-user-popup-id=${id} class="users__user-popup-wrapper hide">
          <div class="users__popup">
            <div class="users__popup-close-wrapper">
              <div data-popup-close-id="${id}" class="users__user-popup-close">
                <div data-popup-close-id="${id}" class="users__close-char"></div>
              </div>
            </div>
            <div class="users__popup-name">${name}</div>
            <div class="users__popup-info-wrapper">
              <div class="users__popup-info-item">
                <div class="users__popup-info-label">Телефон:</div>
                <div class="users__popup-info underline">${phone}</div>
              </div>
              <div class="users__popup-info-item">
                <div class="users__popup-info-label">Почта:</div>
                <div class="users__popup-info underline">${email}</div>
              </div>
              <div class="users__popup-info-item">
                <div class="users__popup-info-label">Дата приема:</div>
                <div class="users__popup-info">${hire_date}</div>
              </div>
              <div class="users__popup-info-item">
                <div class="users__popup-info-label">Должность:</div>
                <div class="users__popup-info">${cutPositionName}</div>
              </div>
              <div class="users__popup-info-item">
                <div class="users__popup-info-label">Подразделение:</div>
                <div class="users__popup-info">${cutDepartment}</div>
              </div>
            </div>
            <div class="users__additional-info-wrapper">
              <div class="users__additional-title">Дополнительная информация:</div>
              <div class="users__additional-info">${address}</div>
            </div>
          </div>
        </div>
    `;
}

function cutString(string, length) {
  return string.length > length ? string.slice(0, length) + '...' : string;
}
