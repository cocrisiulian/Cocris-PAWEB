function deepCopyOf(entity) {
  return JSON.parse(JSON.stringify(entity));
}

class Repository {
  #heroes;

  constructor() {
    this.#heroes = [
      { name: `Bob`, level: `senior` },
      { name: `Kevin`, level: `middle` },
      { name: `Dave`, level: `junior` },
    ];
  }

  readHeroes() {
    return deepCopyOf(this.#heroes);
  }

  createHero(heroToBeCreated) {
    this.#heroes.push(heroToBeCreated);
  }

  deleteHero(nameOfHeroToBeDeleted) {
    this.#heroes = this.#heroes.filter(hero => hero.name !== nameOfHeroToBeDeleted);
  }

  updateHero(nameOfHeroToBeUpdated, updatedHero) {
    this.#heroes = this.#heroes.map(hero => {
      if (hero.name === nameOfHeroToBeUpdated) {
        return { name: updatedHero.name, level: updatedHero.level };
      } else {
        return hero;
      }
    });
  }
}
