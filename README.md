This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run this project

Create `dev.js` file in `server/config/dev.js` with content of:

```javascript
module.exports = {
  DB_URI: "your_mongo_connection_string", //Get it here: https://www.mongodb.com/cloud/atlas,
  JWT_SECRET: "some_unique value", //e.g 'hdgbcdnhmdn'
};
```

In base folder of project run `npm install` and then `npm start` to startup dev server

To run api server go to `server` folder with command `cd server` and run `node index.js`

## How to populate DB with default data

In case `dev.js` file is created you can run in `server` folder command to populate database `node fakeDB/cleanDB.js`

