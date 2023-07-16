import { fetchBreeds } from './js/cat-api';
import { fetchCatByBreed } from './js/cat-api';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

export const selectors = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader-wrap'),
};
export const parametersRequest = {
  BASE_URL: 'https://api.thecatapi.com/v1',
  END_POINT_BREEDS: '/breeds',
  END_POINT_INFO: '/images/search',
  API_KEY:
    'live_5PFQLtZu7PM2bW0sHuXaUCHGM7j1W1erTNNJTIPa2LHSDj64fYGeP3Ui7GaKvor7',
};

const notifyOption = { cssAnimationStyle: 'from-top', closeButton: true };

axios.defaults.headers.common['x-api-key'] = parametersRequest.API_KEY;

selectors.breedSelect.innerHTML =
  '<option value="" selected disabled>Choose a cat breed</option>';

fetchBreeds()
  .then(data => {
    selectors.breedSelect.insertAdjacentHTML(
      'beforeend',
      addOptionsToSelect(data)
    );

    new SlimSelect({
      select: selectors.breedSelect,
    });
  })
  .catch(err =>
    Notify.failure('Oops! Something went wrong! Try reloading the page!', notifyOption)
  )
  .finally(() => {
    selectors.loader.classList.add('visually-hidden');
  });

function addOptionsToSelect(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

selectors.breedSelect.addEventListener('change', onSelect);

function onSelect() {
  const breedId = selectors.breedSelect.value;

  fetchCatByBreed(breedId)
    .then(data => {
      selectors.catInfo.innerHTML = createMarkup(data);
    })
    .catch(err =>
      Notify.failure('Oops! Something went wrong! Try reloading the page!', notifyOption)
    )
    .finally(() => {
      selectors.loader.classList.add('visually-hidden');
    });
}

function createMarkup(arr) {
  return arr
    .map(
      ({ url, breeds }) =>
        `<img src="${url}" alt="${breeds[0].name}" width="300"><div>
        <h2>${breeds[0].name}</h2>
        <p>${breeds[0].description}</p>
        <p>Temperament: ${breeds[0].temperament}</p></div>`
    )
    .join('');
}
