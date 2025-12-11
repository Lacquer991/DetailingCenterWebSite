export function initLoginButton() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginBtnContainer = document.querySelector('.header__login-link');

    if (!loginBtnContainer || !isLoggedIn) return;

    loginBtnContainer.outerHTML =
        `<a href="/DetailingCenterWebSite/html/accountPage/index.html"><button class="btn btn--primary">Кабинет</button></a>`;
}

initLoginButton();