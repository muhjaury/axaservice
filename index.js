const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv/config");

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Route API
const apiRoute = require("./routes/api");
const loginRegister = require("./routes/auth");
app.use("/api", apiRoute);
app.use("/u", loginRegister);

app.get("/", (_, res) => {
  res.send("AXA Technical Test");
});

/***************** User *****************/

app.listen(3000, () => {
  console.log("running on 3001 port");
});

/***************** User *****************/
