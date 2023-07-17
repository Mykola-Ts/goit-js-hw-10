import { selectors } from '../index';
import { parametersRequest } from '../index';
import axios from 'axios';

/**
 * Виконує HTTP-запит і повертає проміс із масивом порід - результатом запиту
 * @returns {Promise} Проміс із масивом порід
 */
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

/**
 * Виконує HTTP-запит за ідентифікатором і повертає проміс із даними про кота - результатом запиту
 * @param {String} breedId
 * @returns {Promise} Проміс із даними про кота
 */
export const fetchCatByBreed = function fetchCatByBreed(breedId) {
  selectors.loader.classList.remove('visually-hidden');
  selectors.catInfo.classList.add('visually-hidden');

  if (document.querySelector('#NotiflixNotifyWrap')) {
    const errorNotify = document.querySelector('#NotiflixNotifyWrap');
    errorNotify.remove();
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
