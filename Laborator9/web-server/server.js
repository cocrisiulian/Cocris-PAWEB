const express = require("express");
const server = express();
const PORT = 3000;

server.use(express.static("public"));

server.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));

