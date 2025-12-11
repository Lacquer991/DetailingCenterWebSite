/*
Подключаем библиотеку validator.js для строгой проверки email,
длины пароля и других текстовых полей.
Библиотека позволяет избежать ошибок валидации вручную.
 */
import validator from "https://esm.run/validator";
export function initLogin() {
    const loginForm = document.querySelector('.login__form');

    if (!loginForm) return;

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!validator.isEmail(email)) {
            alert('Некорректный адрес электронной почты!');
            return;
        }

        if (validator.isEmpty(password)) {
            alert('Введите пароль!');
            return;
        }

        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = '/DetailingCenterWebSite/index.html';
    });
}

initLogin();