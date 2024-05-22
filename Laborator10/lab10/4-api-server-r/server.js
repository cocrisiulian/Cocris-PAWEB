const express = require(`express`);
const server = express();
const PORT = 8080;
let heroes = [`Dave`, `Kevin`, `Bob`, `Stuart`];

server.use(express.static(`public`));

server.get(`/api/heroes`, (req, res) => {
  const textToSearch = req.query[`text-to-search`];
  const filteredHeroes = heroes.filter(hero => hero.includes(textToSearch));
  res.send(JSON.stringify(filteredHeroes));
});

server.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
