function deepCopyOf(entity) {
  return JSON.parse(JSON.stringify(entity));
}

class Repository {
  #connectionPool;
  constructor(connectionPool) {
    this.#connectionPool = connectionPool;
  }

  readHeroes() {
    return this.runQuery("SELECT * FROM heroes;");
  }

  createHero(heroToBeCreated) {
    return this.runQuery(`INSERT INTO heroes 
    VALUES ('${heroToBeCreated.name}', 
    '${heroToBeCreated.level}');`);
  }

  deleteHero(nameOfHeroToBeDeleted) {
    this.runQuery(`DELETE FROM heroes 
    WHERE name = '${nameOfHeroToBeDeleted}';`);
  }

  runQuery(query) {
    let result = new Promise((resolve, reject) => {
      this.#connectionPool.query(query, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });

    return result;
  }
}

module.exports = Repository;
