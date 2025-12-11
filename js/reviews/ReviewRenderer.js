import { renderTopServices } from './TopService.js';

export function renderReview(review, index, template, reviewsContainer, editFormContainer, openFormBtn, editForm) {
    const clone = template.content.cloneNode(true);
    const card = clone.querySelector('.reviews__card');

    card.querySelector('.reviews__author').textContent = review.author;
    card.querySelector('.reviews__service').textContent = review.service;
    card.querySelector('.reviews__text p').textContent = review.text;

    const filledStars = '★'.repeat(review.rating);
    const emptyStars = '☆'.repeat(5 - review.rating);
    card.querySelector('.reviews__rating').textContent = filledStars + emptyStars;

    const editBtn = card.querySelector('.reviews__edit-btn');
    editBtn.addEventListener('click', () => {
        const isShow = editFormContainer.classList.contains('show');

        if (isShow) {
            editFormContainer.classList.remove('show');
            openFormBtn.style.display = 'block';
            editForm.dataset.editIndex = '';
            return;
        }

        editFormContainer.classList.add('show');
        openFormBtn.style.display = 'none';

        editForm.author.value = review.author;
        editForm.service.value = review.service;
        editForm.text.value = review.text;
        editForm.rating.value = review.rating;

        window.scrollTo({ top: 0, behavior: 'smooth' });
        editForm.dataset.editIndex = index;
    });

    reviewsContainer.appendChild(clone);
}

export function renderAllReviews(reviews, template, reviewsContainer, editFormContainer, openFormBtn, editForm) {
    reviewsContainer.innerHTML = '';
    reviews.forEach((review, index) =>
        renderReview(review, index, template, reviewsContainer, editFormContainer, openFormBtn, editForm)
    );
    renderTopServices(reviews)
}