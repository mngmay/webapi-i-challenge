// implement your API here

const express = require("express");

const Users = require("./data/db.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("You got the server");
});

const port = 3000;
server.listen(port, () => console.log("\napi running\n"));
