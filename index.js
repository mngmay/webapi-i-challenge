// implement your API here

const express = require("express");

const Users = require("./data/db.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("You got the server");
});

server.get("/api/users", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: "error getting the list of users" });
    });
});

server.post("/api/users", (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  Users.insert(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: "error adding new user" });
    });
});

const port = 3000;
server.listen(port, () => console.log("\napi running\n"));
