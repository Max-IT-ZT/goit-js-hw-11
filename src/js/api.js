import axios from 'axios';

const apiKey = '39546340-4a7e93b4b9c9fbb423c89ebde';

export async function fetchImages(searchQuery, page) {
  const perPage = 40;
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
}
