import { selectors } from '../index';
import { parametersRequest } from '../index';
import axios from 'axios';

export const fetchBreeds = function fetchBreeds() {
  selectors.loader.classList.remove('visually-hidden');

  return axios
    .get(`${parametersRequest.BASE_URL}${parametersRequest.END_POINT_BREEDS}`)
    .then(resp => {
      if (resp.status !== 200) {
        throw new Error(resp.statusText);
      }

      return resp.data;
    });
};

export const fetchCatByBreed = function fetchCatByBreed(breedId) {
  selectors.loader.classList.remove('visually-hidden');

  if (document.querySelector('#NotiflixNotifyWrap')) {
    const error = document.querySelector('#NotiflixNotifyWrap');
    error.remove()
  }

  return axios
    .get(
      `${parametersRequest.BASE_URL}${parametersRequest.END_POINT_INFO}?breed_ids=${breedId}`
    )
    .then(resp => {
      if (resp.status !== 200) {
        throw new Error(resp.statusText);
      }

      return resp.data;
    });
};
