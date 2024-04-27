const express = require("express");
const app = express();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

app.get("/userList", async (_, res) => {
  try {
    const url = "https://jsonplaceholder.typicode.com/users";
    fetch(url, { method: "GET" })
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
            userList: data,
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
  } catch (err) {
    return res.status(200).json({
      status: res.statusCode,
      data: {
        message: "SERVER_ERROR " + err,
        key: "",
      },
    });
  }
});

app.get("/posts", async (req, res) => {
  const id = req.query.id;
  try {
    const url = "https://jsonplaceholder.typicode.com/users/" + id + "/posts/";
    fetch(url, { method: "GET" })
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
        const response = data.map((item) => {
          return { ...item, comments: [] };
        });
        return res.status(200).json({
          status: res.statusCode,
          data: {
            message: "SUCCESS",
            posts: response,
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
  } catch (err) {
    return res.status(200).json({
      status: res.statusCode,
      data: {
        message: "SERVER_ERROR " + err,
        key: "",
      },
    });
  }
});

app.get("/albums", async (req, res) => {
  const id = req.query.id;
  try {
    const url = "https://jsonplaceholder.typicode.com/users/" + id + "/albums/";
    fetch(url, { method: "GET" })
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
        const response = data.map((item) => {
          return { ...item, photos: [] };
        });
        return res.status(200).json({
          status: res.statusCode,
          data: {
            message: "SUCCESS",
            albums: response,
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
  } catch (err) {
    return res.status(200).json({
      status: res.statusCode,
      data: {
        message: "SERVER_ERROR " + err,
        key: "",
      },
    });
  }
});

app.get("/photos", async (req, res) => {
  const id = req.query.id;
  try {
    const url =
      "https://jsonplaceholder.typicode.com/albums/" + id + "/photos/";
    fetch(url, { method: "GET" })
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
            photos: data,
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
  } catch (err) {
    return res.status(200).json({
      status: res.statusCode,
      data: {
        message: "SERVER_ERROR " + err,
        key: "",
      },
    });
  }
});

app.get("/comments", async (req, res) => {
  const id = req.query.id;
  try {
    const url =
      "https://jsonplaceholder.typicode.com/posts/" + id + "/comments/";
    fetch(url, { method: "GET" })
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
            comments: data,
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
  } catch (err) {
    return res.status(200).json({
      status: res.statusCode,
      data: {
        message: "SERVER_ERROR " + err,
        key: "",
      },
    });
  }
});

module.exports = app;
