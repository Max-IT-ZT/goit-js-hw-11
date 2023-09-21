import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const apiKey = '39546340-4a7e93b4b9c9fbb423c89ebde';
let page = 1;
let searchQuery = '';
let isLoading = false;
let hasShownSuccessMessage = false;

let lightbox = new SimpleLightbox('.gallery a');

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  searchQuery = e.target.searchQuery.value.trim();
  page = 1;
  gallery.innerHTML = '';
  hasShownSuccessMessage = false;
  loadMoreImages();
});

function showSuccessMessage(totalHits) {
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}

async function loadMoreImages() {
  if (isLoading) return;

  isLoading = true;

  const perPage = 40;
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      isLoading = false;
      return;
    }

    if (!hasShownSuccessMessage) {
      showSuccessMessage(data.totalHits);
      hasShownSuccessMessage = true;
    }

    data.hits.forEach(image => {
      const photoCard = document.createElement('div');
      photoCard.classList.add('photo-card');
      photoCard.innerHTML = `
                <a href="${image.largeImageURL}" data-lightbox="image">
                  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
                </a>
                <div class="info">
                    <p class="info-item"><b>Likes</b> ${image.likes}</p>
                    <p class="info-item"><b>Views</b> ${image.views}</p>
                    <p class="info-item"><b>Comments</b> ${image.comments}</p>
                    <p class="info-item"><b>Downloads</b> ${image.downloads}</p>
                </div>
            `;
      gallery.appendChild(photoCard);
    });

    if (data.totalHits > page * perPage) {
      page++;
    } else {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      window.removeEventListener('scroll', handleScroll);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    Notiflix.Notify.failure(
      'An error occurred while fetching data. Please try again later.'
    );
  } finally {
    isLoading = false;
    lightbox.refresh();
  }
}

function handleScroll() {
  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 100
  ) {
    loadMoreImages();
  }
}

window.addEventListener('scroll', handleScroll);
