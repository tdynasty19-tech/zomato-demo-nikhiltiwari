const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "zomato", // Database Name
  "root",   // MySQL Username
  "nikhil@12345", // MySQL Password
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database Connected Successfully");
  })
  .catch((err) => {
    console.log("❌ Database Connection Failed");
    console.log(err.message);
  });

module.exports = sequelize;