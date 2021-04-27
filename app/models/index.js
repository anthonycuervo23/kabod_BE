const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.exercises = require("./Exercise.js")(mongoose);
db.results = require("./Result.js")(mongoose);

module.exports = db;