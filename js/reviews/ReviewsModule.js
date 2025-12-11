import {loadReviews} from './ReviewStorage.js';
import {initForms} from './ReviewForms.js';
import {loadExternalReviews} from './ReviewExternal.js';
import {renderAllReviews} from './ReviewRenderer.js';

export function initReviews() {
    const reviews = loadReviews();

    const reviewsContainer = document.querySelector('.reviews');
    const template = document.getElementById('review-template');
    const formContainer = document.getElementById('review-form-container');
    const form = document.getElementById('review-form');
    const editFormContainer = document.getElementById('review-edit-form-container');
    const editForm = document.getElementById('review-edit-form');
    const openFormBtn = document.getElementById('open-form-btn');
    const deleteBtn = document.getElementById('delete-review-btn');
    const getBtn = document.getElementById('external-reviews-btn');
    const loader = document.getElementById('loader');

    renderAllReviews(reviews, template, reviewsContainer, editFormContainer, openFormBtn, editForm);
    initForms(reviews, template, reviewsContainer, formContainer, form, editFormContainer, editForm, openFormBtn, deleteBtn);
    getBtn.addEventListener('click', () => loadExternalReviews(reviews, template, reviewsContainer, editFormContainer, openFormBtn, editForm, loader, getBtn));
}

initReviews();