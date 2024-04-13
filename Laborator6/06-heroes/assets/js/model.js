const validLevels = ["junior", "middle", "senior"];

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
    let errorMessages = ``;

    if (this.#isInvalidHeroName(name)) {
      errorMessages += "The hero name must be between 3 and 100 characters long.";
    }

    if (this.#isInvalidHeroLevel(level) && this.#isValidLevel(level)) {
      errorMessages += "The hero level is required.";
    }

    if (this.#isDuplicateHeroName(name)) {
      errorMessages += "The hero name already exists.";
    }

    if (errorMessages === ``) {
      this.#repository.createHero(heroToBeCreated);
    } else {
      throw new Error(errorMessages);
    }
  }

  deleteHero(nameOfHeroToBeDeleted) {
    if (this.#isDuplicateHeroName(nameOfHeroToBeDeleted)) {
      if (this.#getLevelFromName(nameOfHeroToBeDeleted) === "junior") {
        this.#repository.deleteHero(nameOfHeroToBeDeleted);
      }
    }
  }

  updateHero(nameOfHeroToBeUpdated, updatedHero) {
    let errorMessages = ``;

    if (
      this.#isDuplicateHeroName(nameOfHeroToBeUpdated) &&
      !this.#isInvalidHeroLevel(updatedHero.level) &&
      this.#isValidLevel(updatedHero.level)
    ) {
      if (this.#isInvalidHeroName(updatedHero.name)) {
        errorMessages += "The hero name must be between 3 and 100 characters long.";
      } else {
        if (this.#isDuplicateHeroName(updatedHero.name)) {
          errorMessages += "The new hero name already exists.";
        } else {
          const originalHeroLevel = this.#getLevelFromName(nameOfHeroToBeUpdated);
          const updatedHeroLevel = updatedHero.level;

          if (
            validLevels.indexOf(originalHeroLevel) === validLevels.indexOf(updatedHeroLevel) + 1 ||
            validLevels.indexOf(originalHeroLevel) === validLevels.indexOf(updatedHeroLevel)
          ) {
            this.#repository.updateHero(nameOfHeroToBeUpdated, updatedHero);
          }
        }
      }
    } else {
      errorMessages += "The hero name does not exist or the level is invalid.";
    }

    if (errorMessages === ``) {
      console.log("Hero rename was successful.");
    } else {
      throw new Error(errorMessages);
    }
  }

  #isInvalidHeroName(name) {
    return name.length < 3 || name.length > 100;
  }

  #isInvalidHeroLevel(level) {
    return level === ``;
  }

  #isDuplicateHeroName(name) {
    const heroes = this.#repository.readHeroes();
    return heroes.some(hero => hero.name === name);
  }

  #getLevelFromName(name) {
    const heroes = this.#repository.readHeroes();
    const foundHero = heroes.find(hero => hero.name === name);
    return foundHero ? foundHero.level : "";
  }

  #isValidLevel(level) {
    return validLevels.includes(level);
  }
}
