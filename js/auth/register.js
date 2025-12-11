/*
Подключаем библиотеку validator.js для строгой проверки email,
длины пароля и других текстовых полей.
Библиотека позволяет избежать ошибок валидации вручную.
 */
import validator from "https://esm.run/validator";
export function initRegistration() {
    const regForm = document.querySelector('.registration__form');

    if (!regForm) return;

    regForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const password2 = document.getElementById('password2').value.trim();
        const agree = document.getElementById('agree').checked;

        if (!validator.isEmail(email)) {
            alert('Введите корректный адрес электронной почты.');
            return;
        }
        if (!validator.isLength(password, {min: 6})) {
            alert('Пароль должен быть не короче 6 символов.');
            return;
        }

        if (!validator.equals(password, password2)) {
            alert('Пароли не совпадают!');
            return;
        }

        if (!agree) {
            alert('Примите условия!');
            return;
        }

        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = '/DetailingCenterWebSite/index.html';
    });
}

initRegistration();