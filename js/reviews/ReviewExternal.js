import { saveReviews } from './ReviewStorage.js';
import { renderAllReviews } from './ReviewRenderer.js';

export async function loadExternalReviews(reviews, template, reviewsContainer, editFormContainer, openFormBtn, editForm, loader, getBtn) {
    try {
        loader.style.display = 'flex';
        reviewsContainer.style.display = 'none';
        getBtn.disabled = true;
        getBtn.textContent = 'Загрузка...';

        const centerId = Math.floor(Math.random() * 100) + 1;
        const minRange = Math.max(11, centerId);
        const maxRange = Math.max(21, centerId + 10);

        const ids = [];
        for (let i = minRange - 10; i <= centerId + 10; i++) {
            ids.push(`id=${i}`);
        }
        const query = ids.join('&');

        const url = `https://jsonplaceholder.typicode.com/comments?${query}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const newReviews = await response.json();

        const formatted = newReviews.map(r => ({
            author: r.name,
            service: r.email,
            text: r.body,
            rating: (r.id % 5) + 1
        }));

        reviews.push(...formatted);
        saveReviews(reviews);
        renderAllReviews(reviews, template, reviewsContainer, editFormContainer, openFormBtn, editForm);

        getBtn.textContent = 'Загрузить другие отзывы';
    } catch (error) {
        console.error('Ошибка при загрузке отзывов:', error);
        alert('Не удалось загрузить отзывы. Попробуйте позже.');
        getBtn.textContent = 'Ошибка загрузки';
    } finally {
        loader.style.display = 'none';
        reviewsContainer.style.display = 'grid';
        getBtn.disabled = false;
    }
}