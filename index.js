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
  if (!newUser.name || !newUser.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    Users.insert(newUser)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(error => {
        res.status(500).json({
          message: "There was an error while saving the user to the database"
        });
      });
  }
});

server.get("/api/users", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved." });
    });
});

server.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;

  Users.findById(userId)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The user information could not be retrieved." });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;

  Users.remove(userId)
    .then(user => {
      if (user) {
        res.status(200).json({ message: "user deleted successfully" });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "The user could not be removed" });
    });
});

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  if (!changes.name || !changes.body) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user" });
  }
  Users.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The user information could not be modified." });
    });
});

const port = 3000;
server.listen(port, () => console.log("\napi running\n"));
