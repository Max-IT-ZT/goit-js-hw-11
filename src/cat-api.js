import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_CKm9js6K0bt8UxvnuzbmH5oZmnTTCuCwnZFysJCmiEHWtodWTss1eJ91X1koylSq';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.data;
    })
    .catch(error => {
      console.error('Fetch breeds error:', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.data;
    })
    .catch(error => {
      console.error('Fetch cat error:', error);
      throw error;
    });
}
