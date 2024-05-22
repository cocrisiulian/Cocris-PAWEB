class Model {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  readHeroes() {
    return this.#repository.readHeroes();
  }

  createHero(heroToBeCreated) {
    const { name, level } = heroToBeCreated;
    let errorMessages = {};

    if (this.#wrongHeroName(name)) {
      errorMessages.name =
        "The hero name is wrong. It must have a length between 3 and 100.";
    }

    if (this.#wrongHeroLevel(level)) {
      errorMessages.level =
        "The hero level is required and must be one of 'junior', 'middle', or 'senior'.";
    }

    if (this.#alreadyExistsHeroName(name)) {
      errorMessages.exists = "The hero name already exists.";
    }

    if (Object.keys(errorMessages).length === 0) {
      this.#repository.createHero(heroToBeCreated);
    }
    return errorMessages;
  }

  deleteHero(nameOfHeroToBeDeleted) {
    let errorMessages = {};

    if (!this.#alreadyExistsHeroName(nameOfHeroToBeDeleted)) {
      errorMessages.exists = "The hero name does not exist.";
    }

    if (this.#isJunior(nameOfHeroToBeDeleted)) {
      errorMessages.level = "You cannot delete a junior hero.";
    }

    if (Object.keys(errorMessages).length === 0) {
      this.#repository.deleteHero(nameOfHeroToBeDeleted);
    }
    return errorMessages;
  }

  updateHero(nameOfHeroToBeUpdated, updatedHero) {
    const { name, level } = updatedHero;
    let errorMessages = {};

    if (this.#wrongHeroName(name)) {
      errorMessages.name =
        "The hero name is wrong. It must have a length between 3 and 100.";
    }

    if (this.#wrongHeroLevel(level)) {
      errorMessages.level =
        "The hero level is required and must be one of 'junior', 'middle', or 'senior'.";
    }

    if (!this.#checkUpdateLevel(nameOfHeroToBeUpdated, level)) {
      errorMessages.updateLevel = `You can only update the hero level from 'junior' to 'middle' & 'middle' to 'senior'`;
    }

    if (
      this.#alreadyExistsHeroName(name) &&
      updatedHero.name != nameOfHeroToBeUpdated
    ) {
      errorMessages.exists = "The hero name already exists.";
    }

    if (Object.keys(errorMessages).length === 0) {
      this.#repository.updateHero(nameOfHeroToBeUpdated, updatedHero);
    }
    return errorMessages;
  }

  #wrongHeroName(name) {
    return name.length < 3 || name.length > 100;
  }

  #wrongHeroLevel(level) {
    return (
      level === `` ||
      (level !== `junior` && level !== `middle` && level !== `senior`)
    );
  }

  #checkUpdateLevel(oldName, newLevel) {
    const heroes = this.#repository.readHeroes();
    let oldLevel = "";

    for (const hero of heroes) {
      if (hero.name === oldName) {
        oldLevel = hero.level;
        break;
      }
    }

    return (
      (oldLevel === `junior` && newLevel === `middle`) ||
      (oldLevel === `middle` && newLevel === `senior`) ||
      oldLevel === newLevel
    );
  }

  #alreadyExistsHeroName(name) {
    const heroes = this.#repository.readHeroes();
    for (const hero of heroes) {
      if (hero.name === name) {
        return true;
      }
    }
    return false;
  }

  #isJunior(name) {
    const heroes = this.#repository.readHeroes();
    for (const hero of heroes) {
      if (hero.name === name && hero.level === `junior`) {
        return true;
      }
    }
    return false;
  }
}

module.exports = Model;
