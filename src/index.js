import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener('input', debounce(onSearchBox, DEBOUNCE_DELAY));

function onSearchBox(event) {
  const name = event.target.value.trim();
  if (!name) {
    return;
  }

  fetchCountries(name)
    .then(data => {
      createMarkup(data);
    })
    .catch(error => {
      console.log(error);
      Notify.failure(
        'Too many matches found. Please enter a more specific name.',
        { position: 'center-center', width: '400px', fontSize: '20px' }
      );
      clearMarkup();
    });
}
