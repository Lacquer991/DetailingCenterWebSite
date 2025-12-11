export function validateReview(review) {
    if (!review.author) {
        alert('Пожалуйста, введите ваше имя.');
        return false;
    }
    if (!review.service) {
        alert('Пожалуйста, выберите услугу.');
        return false;
    }
    if (review.author.length < 3) {
        alert('Имя должно быть не короче 3 символов.');
        return false;
    }
    if (!review.text || review.text.length < 5) {
        alert('Текст отзыва должен быть не короче 5 символов.');
        return false;
    }
    return true;
}