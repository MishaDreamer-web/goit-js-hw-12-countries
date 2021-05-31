const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountry(countryName) {
  return fetch(`${BASE_URL}/name/${countryName}`).then(response => {
    return response.json();
  });
}

export default { fetchCountry };
