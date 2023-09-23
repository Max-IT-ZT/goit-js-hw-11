import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import * as api from './js/api.js';
import * as gallery from './js/gallery.js';

const searchForm = document.getElementById('search-form');
let page = 1;
let searchQuery = '';
let isLoading = false;
let lightbox;

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  searchQuery = e.target.searchQuery.value.trim();

  if (!searchQuery) {
    Notiflix.Notify.failure('Please enter a query.');
    return;
  }

  page = 1;
  isLoading = false;
  gallery.clearGallery();
  loadMoreImages();
});

function showSuccessMessage(totalHits) {
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}

async function loadMoreImages() {
  if (isLoading) return;

  isLoading = true;

  try {
    const data = await api.fetchImages(searchQuery, page);

    if (data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      gallery.clearGallery();
      isLoading = false;
      return;
    }

    if (page === 1) {
      showSuccessMessage(data.totalHits);
    }

    gallery.createGallery(data.hits);

    if (data.totalHits > page * 40) {
      page++;
      window.addEventListener('scroll', handleScroll);
    } else {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
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
    window.removeEventListener('scroll', handleScroll);
  }
}

lightbox = new SimpleLightbox('.gallery a');
