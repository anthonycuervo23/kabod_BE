const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const admin = require('firebase-admin');
const db = require("./app/models");
require("dotenv/config");

const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS_FILE);
const firebaseDBUrl = process.env.DATABASE_URL;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseDBUrl
});

const app = express();


app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Connect to Database
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to CrossFit Kabod application." });
});

require("./app/routes/pr.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});