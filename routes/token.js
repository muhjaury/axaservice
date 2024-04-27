const jwt = require("jsonwebtoken");
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "aiatest",
});

module.exports = verifyToken;

function verifyToken(roles) {
  return [
    async (req, res, next) => {
      //Header
      const token = req.header("key");
      if (!token) {
        return res.status(200).json({
          status: res.statusCode,
          message: "Key Empty",
        });
      }

      var sql = "SELECT * FROM user WHERE token=?;";
      db.query(sql, [token], (err, result) => {
        if (err) {
          return res.status(200).json({
            status: res.statusCode,
            message: "Error Connect Database",
          });
        }

        if (!result.length) {
          return res.status(200).json({
            status: res.statusCode,
            message: "Key Not Found",
          });
        }

        if (roles) {
          if (!(result[0].role == roles))
          {
            return res.status(200).json({
              status: res.statusCode,
              message: "Unauthorized",
            });
          }
        }

        try {
          const verified = jwt.verify(token, process.env.KEY);
          req.user = verified;
          next();
        } catch (err) {
          res.status(200).json({
            status: res.statusCode,
            message: "Invalid Key",
          });
        }

      });
    },
  ];
}
