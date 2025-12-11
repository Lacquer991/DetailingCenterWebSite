import { saveReviews } from './ReviewStorage.js';
import { validateReview } from './ReviewValidator.js';
import { renderAllReviews } from './ReviewRenderer.js';

export function initForms(reviews, template, reviewsContainer, formContainer, form, editFormContainer, editForm, openFormBtn, deleteBtn) {
    const openFormBtnEl = openFormBtn;
    openFormBtnEl.addEventListener('click', () => {
        const isShow = formContainer.classList.contains('show');
        if (isShow) {
            formContainer.classList.remove('show');
        } else {
            formContainer.classList.add('show');
            editFormContainer.classList.remove('show');
        }
    });

    form.addEventListener('submit', e => {
        e.preventDefault();
        const newReview = {
            author: form.author.value.trim(),
            service: form.service.value,
            text: form.text.value.trim(),
            rating: parseInt(form.rating.value),
        };
        if (!validateReview(newReview)) return;
        reviews.push(newReview);
        saveReviews(reviews);
        renderAllReviews(reviews, template, reviewsContainer, editFormContainer, openFormBtn, editForm);
        form.reset();
        formContainer.classList.remove('show');
    });

    editForm.addEventListener('submit', e => {
        e.preventDefault();
        const editIndex = editForm.dataset.editIndex;
        if (editIndex === undefined || editIndex === '') return;

        reviews[editIndex] = {
            author: editForm.author.value.trim(),
            service: editForm.service.value,
            text: editForm.text.value.trim(),
            rating: parseInt(editForm.rating.value),
        };
        if (!validateReview(reviews[editIndex])) return;
        saveReviews(reviews);
        renderAllReviews(reviews, template, reviewsContainer, editFormContainer, openFormBtn, editForm);
        editForm.reset();
        editFormContainer.classList.remove('show');
        openFormBtn.style.display = 'block';
        editForm.dataset.editIndex = '';
    });

    deleteBtn.addEventListener('click', () => {
        const editIndex = editForm.dataset.editIndex;
        if (editIndex === undefined || editIndex === '') return;

        reviews.splice(editIndex, 1);
        saveReviews(reviews);
        renderAllReviews(reviews, template, reviewsContainer, editFormContainer, openFormBtn, editForm);
        editForm.reset();
        editFormContainer.classList.remove('show');
        openFormBtn.style.display = 'block';
        editForm.dataset.editIndex = '';
    });
}