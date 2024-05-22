const fs = require("fs");
const path = require("path");

const FILE_PATH = path.join(__dirname, "heroes.json");

function readFromFile() {
  if (!fs.existsSync(FILE_PATH)) {
    return [];
  }
  const data = fs.readFileSync(FILE_PATH, "utf-8");
  return JSON.parse(data);
}

function writeToFile(data) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

function deepCopyOf(entity) {
  return JSON.parse(JSON.stringify(entity));
}

class Repository {
  #heroes;

  constructor() {
    this.#heroes = readFromFile();
  }

  readHeroes() {
    this.#heroes = readFromFile();
    return deepCopyOf(this.#heroes);
  }

  createHero(heroToBeCreated) {
    this.#heroes = readFromFile();
    this.#heroes.push(heroToBeCreated);
    writeToFile(this.#heroes);
  }

  deleteHero(nameOfHeroToBeDeleted) {
    this.#heroes = readFromFile();
    this.#heroes = this.#heroes.filter(
      (hero) => hero.name !== nameOfHeroToBeDeleted
    );
    writeToFile(this.#heroes);
  }

  updateHero(nameOfHeroToBeUpdated, updatedHero) {
    this.#heroes = readFromFile();
    this.#heroes = this.#heroes.map((hero) =>
      hero.name === nameOfHeroToBeUpdated ? updatedHero : hero
    );
    writeToFile(this.#heroes);
  }
}

module.exports = Repository;
