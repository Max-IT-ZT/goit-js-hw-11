import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('.breed-select');
  const catInfoDiv = document.querySelector('.cat-info');
  const loader = document.querySelector('.loader');
  const errorElement = document.querySelector('.error');

  fetchBreeds()
    .then(breeds => {
      const optionsHTML = breeds
        .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
        .join('');
      breedSelect.innerHTML = optionsHTML;
    })
    .catch(() => {
      Notiflix.Notify.failure(errorElement.textContent);
    });

  breedSelect.addEventListener('change', () => {
    const selectedBreedId = breedSelect.value;

    if (selectedBreedId) {
      loader.classList.remove('hidden');
      catInfoDiv.classList.add('hidden');
      errorElement.classList.add('hidden');

      fetchCatByBreed(selectedBreedId)
        .then(catData => {
          catInfoDiv.innerHTML = '';

          const catInfoHTML = `
    <div class="img-size"><img src="${catData[0].url}" alt="Cat Image"></div><div class="text">
    <h1>${catData[0].breeds[0].name}</h1>
    <p>${catData[0].breeds[0].description}</p>
    <p><span class="temperament">Temperament:</span> ${catData[0].breeds[0].temperament}</p>
    </div>
  `;
          console.log(catData);
          catInfoDiv.innerHTML = catInfoHTML;
        })
        .catch(() => {
          catInfoDiv.innerHTML = '';
          Notiflix.Notify.failure(errorElement.textContent);
        })
        .finally(() => {
          loader.classList.add('hidden');
          catInfoDiv.classList.remove('hidden');
        });
    }
  });
});
