const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// create new Sequelize instance, which will be used to interact with the database
if (process.env.JAWSDB_URL) {

  // if 'JAWSDB_URL' is defined, create a Sequelize instance using the URL provided in the environment variable
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // if "JAWSDB_URL' is not defined, create a Sequelize instance using the provided database credentials from environment variables"
  console.log(process.env.DB_USER)
  sequelize = new Sequelize(
    'blogDB',
    'root',
    'Heatherstarr1234',
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
