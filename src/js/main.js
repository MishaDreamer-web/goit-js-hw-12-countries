import countryAPI from './fetchCountries.js';

import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

import countriesMarkup from '../templates/markup.hbs';
import resultList from '../templates/list.hbs';
import debounce from 'lodash.debounce';

const refs = {
  input: document.querySelector('.input'),
  countriesList: document.querySelector('.js-card-container'),
};

refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  let countrySearch = event.target.value;
  clearMarkup();

  if (!countrySearch) {
    return;
  }
  countryAPI
    .fetchCountry(countrySearch)
    .then(foundResult)
    .catch(error => console.log(error));
}

function clearMarkup() {
  refs.countriesList.innerHTML = '';
}

function renderCountryCard(option, countries) {
  const markup = option(countries);
  refs.countriesList.insertAdjacentHTML('beforeend', markup);
}

function foundResult(countries) {
  if (countries.length > 10) {
    tooManyMatchesFound();
  } else if (countries.length > 1 && countries.length <= 10) {
    renderCountryCard(resultList, countries);
  } else if (countries.length === 1) {
    renderCountryCard(countriesMarkup, countries);
  } else {
    noResult();
  }
}

function tooManyMatchesFound() {
  error({
    text: 'Too many matches found. Please, enter a more specific query!',
    delay: 2000,
  });
}

function noResult() {
  error({
    text: 'There is no matches. Please, try change your request!',
    delay: 2000,
  });
}
// countryAPI.fetchCountry('ukraine').then(data => {
//   console.log(data);
// });
