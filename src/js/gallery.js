export function createGallery(images) {
  const gallery = document.querySelector('.gallery');

  images.forEach(image => {
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
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

export function refreshGallery() {}
