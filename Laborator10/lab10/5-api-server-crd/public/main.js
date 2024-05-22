const htmlNewHeroName = document.getElementById(`new-hero-name`);
const htmlNewHeroLevel = document.getElementById(`new-hero-level`);
const htmlCreate = document.getElementById(`create`);
const htmlUpdate = document.getElementById(`update`);
const htmlDelete = document.getElementById(`delete`);
const htmlHeroesList = document.querySelector(`#heroes tbody`);

window.addEventListener(`load`, loadHeroes);
htmlHeroesList.addEventListener(`click`, onHeroesClick);
htmlCreate.addEventListener(`click`, onCreateClick);
htmlUpdate.addEventListener(`click`, onUpdateClick);
htmlDelete.addEventListener(`click`, onDeleteClick);

let selectedHero;

async function loadHeroes() {
  const response = await performRequest(
    `GET`,
    `/api/heroes/`,
    { "text-to-search": "" },
    {}
  );
  const heroes = response.body;
  loadHeroesInPage(heroes);
  selectedHero = null;
}

async function onHeroesClick(event) {
  if (event.target.tagName === "TD") {
    const selectedRow = event.target.parentNode;
    for (const child of htmlHeroesList.childNodes) {
      child.className = ``;
    }
    selectedRow.classList.add("selected");
    selectedHero = {
      name: selectedRow.cells[0].innerText,
      level: selectedRow.cells[1].innerText,
    };
  }
}

async function onCreateClick() {
  const newHero = {
    name: htmlNewHeroName.value,
    level: htmlNewHeroLevel.value,
  };
  const response = await performRequest(
    `POST`,
    `/api/heroes/`,
    {},
    { hero: newHero }
  );
  if (response.statusCode === 200) {
    loadHeroes();
    htmlNewHeroName.value = ``;
    htmlNewHeroLevel.value = ``;
  } else {
    console.log(response.body);
    let message = ``;
    for (const property in response.body) {
      message += `${response.body[property]}\n`;
    }
    alert(message);
  }
}

async function onUpdateClick() {
  const updatedHero = {
    name: htmlNewHeroName.value,
    level: htmlNewHeroLevel.value,
  };

  const response = await performRequest(
    `PUT`,
    `/api/heroes/`,
    {},
    { oldHero: selectedHero, newHero: updatedHero }
  );

  if (response.statusCode === 200) {
    loadHeroes();
    htmlNewHeroName.value = ``;
    htmlNewHeroLevel.value = ``;
  } else {
    console.log(response.body);
    let message = ``;
    for (const property in response.body) {
      message += `${response.body[property]}\n`;
    }
    alert(message);
  }
}

async function onDeleteClick() {
  const response = await performRequest(
    `DELETE`,
    `/api/heroes/`,
    {},
    { hero: selectedHero.name }
  );
  if (response.statusCode === 200) {
    loadHeroes();
  } else {
    console.log(response.body);
    let message = ``;
    for (const property in response.body) {
      message += `${response.body[property]}\n`;
    }
    alert(message);
  }
}

async function performRequest(method, url, queryStringObject, bodyObject) {
  url += `?`;
  for (const property in queryStringObject) {
    url += `${property}=${queryStringObject[property]}&`;
  }
  let response;
  if (method === `GET`) {
    response = await fetch(url);
  } else {
    response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyObject),
    });
  }
  const body = await response.json();
  const statusCode = response.status;
  return { body, statusCode };
}

function loadHeroesInPage(heroes) {
  const tableBody = document.querySelector("#heroes tbody");
  tableBody.innerHTML = "";

  for (const hero of heroes) {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.innerText = hero.name;
    const levelCell = document.createElement("td");
    levelCell.innerText = hero.level;

    row.appendChild(nameCell);
    row.appendChild(levelCell);

    tableBody.appendChild(row);
  }
}
