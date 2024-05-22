document.getElementById(`search`).addEventListener(`click`, onSearch);

async function onSearch(event) {
  event.preventDefault();
  const textToSearch = document.getElementById(`text-to-search`).value;
  heroes = await performGetRequest(`/api/heroes/`, {"text-to-search": textToSearch});
  loadHeroesInPage(heroes);
}

async function performGetRequest(url, queryStringObject) {
  url += `?`;
  for (const property in queryStringObject) {
    url += `${property}=${queryStringObject[property]}&`;
  }
  const response = await fetch(url);
  return response.json();
}

function loadHeroesInPage(heroes) {
  htmlHeroesList = document.getElementById(`heroes`);
  htmlHeroesList.innerText = ``;
  for (const hero of heroes) {
    const htmlHeroItem = document.createElement(`li`);
    htmlHeroItem.innerText = hero;
    htmlHeroesList.appendChild(htmlHeroItem);
  }
}
