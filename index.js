// implement your API here

const express = require("express");

const Users = require("./data/db.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("You got the server");
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

server.get("/api/users", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: "error getting the list of users" });
    });
});

server.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  Users.findById(userId)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: "error getting requested user" });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;

  Users.remove(userId)
    .then(user => {
      res.status(200).json({ message: "user deleted successfully" });
    })
    .catch(error => {
      res.status(500).json({ message: "error deleting the user" });
    });
});

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  Users.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "error updating user" });
    });
});

const port = 3000;
server.listen(port, () => console.log("\napi running\n"));
