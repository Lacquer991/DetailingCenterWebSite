/*
   Подключаем библиотеку lodash-es как ES-модуль.
   Используемая функциональность библиотеки:

   - _.groupBy — группировка отзывов по типу услуги.
   - _.sumBy — вычисление суммы значений рейтингов.
   - _.orderBy — сортировка услуг по средней оценке и количеству отзывов.

   Библиотека используется для анализа данных отзывов и определения
   ТОП-3 наиболее популярных и высоко оцениваемых услуг.
*/
import _ from 'https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.min.js';

export function renderTopServices(reviews) {
    if (!reviews || reviews.length === 0) return;
    const grouped = _.groupBy(reviews, 'service');
    const stats = Object.entries(grouped).map(([service, items]) => {
        const count = items.length;
        const avgRating = (_.sumBy(items, 'rating') / count).toFixed(1);
        return { service, count, avgRating: parseFloat(avgRating) };
    });

    const top3 = _.orderBy(stats, ['avgRating', 'count'], ['desc', 'desc']).slice(0, 3);
    const list = document.getElementById('top-services-list');
    if (!list) return;
    list.innerHTML = '';

    top3.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('top-services__item');
        const filledStars = '★'.repeat(item.avgRating);
        const emptyStars = '☆'.repeat(5 - item.avgRating);
        div.innerHTML = `
            <div class="top-services__name">${item.service}</div>
            <div class="top-services__stats">
                <span>Отзывы: ${item.count}</span>
                <span>${filledStars + emptyStars}</span>
            </div>
        `;

        list.appendChild(div);
    });
}