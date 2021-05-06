const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const admin = require('firebase-admin');
const db = require("./app/models");
require("dotenv/config");

const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const firebaseProjectID = process.env.PROJECT_ID;
const firebasePrivateKey = process.env.PRIVATE_KEY;
const firebaseClientEmail = process.env.CLIENT_EMAIL;
const firebaseDBUrl = process.env.DATABASE_URL;
admin.initializeApp({
  credential: admin.credential.cert({"projectId": firebaseProjectID, "private_key": firebasePrivateKey, "client_email": firebaseClientEmail}),
  databaseURL: firebaseDBUrl
});

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

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
const PORT = process.env.MONGODB_URI || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});