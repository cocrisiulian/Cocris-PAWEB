const e = require("express");
const Model = require("./model.js");
const Repository = require("./repository.js");

const express = require(`express`);
const server = express();
const PORT = 8080;

const repo = new Repository();
const model = new Model(repo);

server.use(express.static(`public`));
server.use(express.json());

// 1. Explore the basics of APIs
// server.use((req, res) => {
//   res.status(200).send(`Method: ${req.method}`);
// });

// 2. Create a sum API
server.get("/sum", (req, res) => {
  const { a, b } = req.query;
  if (!isNaN(parseFloat(a)) && !isNaN(parseFloat(b))) {
    const sum = parseFloat(a) + parseFloat(b);
    res.status(200).send(`Sum: ${sum}`);
  } else {
    res.status(400).send("Invalid operands");
  }
});

server.get(`/api/heroes`, (req, res) => {
  const heroes = model.readHeroes();
  const textToSearch = req.query[`text-to-search`];
  const filteredHeroes = heroes.filter((hero) =>
    hero.name.includes(textToSearch)
  );
  res.status(200).send(JSON.stringify(filteredHeroes));
});

server.post(`/api/heroes`, (req, res) => {
  const newHero = req.body.hero;
  const errorMessages = model.createHero(newHero);

  if (Object.keys(errorMessages).length === 0) {
    res.status(200).send(JSON.stringify({}));
  } else {
    res.status(400).send(JSON.stringify(errorMessages));
  }
});

server.delete(`/api/heroes`, (req, res) => {
  const heroToBeDeleted = req.body.hero;
  const errorMessages = model.deleteHero(heroToBeDeleted);

  if (Object.keys(errorMessages).length === 0) {
    res.status(200).send(JSON.stringify({}));
  } else {
    res.status(400).send(JSON.stringify(errorMessages));
  }
});

server.put(`/api/heroes`, (req, res) => {
  const nameOfHeroToBeUpdated = req.body.oldHero.name;
  const updatedHero = req.body.newHero;
  const errorMessages = model.updateHero(nameOfHeroToBeUpdated, updatedHero);

  if (Object.keys(errorMessages).length === 0) {
    res.status(200).send(JSON.stringify({}));
  } else {
    res.status(400).send(JSON.stringify(errorMessages));
  }
});

server.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
