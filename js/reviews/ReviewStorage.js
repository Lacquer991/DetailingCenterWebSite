export function loadReviews() {
    return JSON.parse(localStorage.getItem('reviews') || '[]');
}

export function saveReviews(reviews) {
    localStorage.setItem('reviews', JSON.stringify(reviews));
}