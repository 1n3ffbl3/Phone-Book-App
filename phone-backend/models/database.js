const db = require('../logic/connection')

db.query(
  `CREATE TABLE phoneBook(
    id SERIAL PRIMARY KEY, 
    firstName VARCHAR(64) not null, 
    lastName VARCHAR(64) not null, 
    phoneNumber VARCHAR(64) not null)`
);
db.end();