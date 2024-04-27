const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const options = {
  method: "GET",
};

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username.match(/user/) && username === password) {
    let matches = username.match(/(\d+)/);

    const token = jwt.sign({ username: username }, process.env.KEY, {
      expiresIn: "24h",
    });
    const url = "https://jsonplaceholder.typicode.com/users/" + matches[0];
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          return res.status(200).json({
            status: res.statusCode,
            data: {
              message: "ERROR",
              key: "",
            },
          });
        }
        return response.json();
      })
      .then((data) => {
        return res.status(200).json({
          status: res.statusCode,
          data: {
            message: "SUCCESS",
            key: token,
            userData: {
              id: data.id,
              name: data.name,
              email: data.email,
              website: data.website,
            },
          },
        });
      })
      .catch((err) => {
        return res.status(200).json({
          status: res.statusCode,
          data: {
            message: "SERVER_ERROR " + err,
            key: "",
          },
        });
      });
  } else {
    return res.status(200).json({
      status: res.statusCode,
      data: {
        message: "SERVER_ERROR",
        key: "",
      },
    });
  }
});

module.exports = app;
