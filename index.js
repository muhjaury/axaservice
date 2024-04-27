const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv/config");

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Route API
const apiRoute = require("./routes/api");
const loginRegister = require("./routes/auth");
app.use("/api", apiRoute);
app.use("/u", loginRegister);

/***************** User *****************/

app.listen(3001, () => {
  console.log("running on 3001 port");
});

/***************** User *****************/
