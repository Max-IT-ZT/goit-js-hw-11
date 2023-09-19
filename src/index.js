const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
const message = document.querySelector('.message');
const apiKey = '39546340-4a7e93b4b9c9fbb423c89ebde';
let page = 1;
let searchQuery = '';

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  searchQuery = e.target.searchQuery.value.trim();
  page = 1;
  gallery.innerHTML = '';
  loadMoreButton.style.display = 'none';
  searchImages();
});

loadMoreButton.addEventListener('click', () => {
  page++;
  searchImages();
});

async function searchImages() {
  const perPage = 40;
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.hits.length === 0) {
      message.textContent =
        'Sorry, there are no images matching your search query. Please try again.';
      return;
    }

    message.textContent = `Hooray! We found ${data.totalHits} images.`;

    data.hits.forEach(image => {
      const photoCard = document.createElement('div');
      photoCard.classList.add('photo-card');
      photoCard.innerHTML = `
                <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
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
      loadMoreButton.style.display = 'block';
    } else {
      loadMoreButton.style.display = 'none';
      message.textContent =
        "We're sorry, but you've reached the end of search results.";
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    message.textContent =
      'An error occurred while fetching data. Please try again later.';
  }
}
