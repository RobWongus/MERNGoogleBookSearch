require('dotenv').config();
const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const mongoose = require("mongoose");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku) switch to 'production' later
if (process.env.NODE_ENV === "development") {
  app.use(express.static("client/build"));
}

const mongoURL = process.env.PROD_MONGODB || "mongodb://localhost:27017/googlebooks"
mongoose.connect(mongoURL, {useNewUrlParser: true})
  .then(() => {
    console.log("🗄 ==> Successfully connected to mongoDB.");
  })
  .catch((err) => {
    console.log(`Error connecting to mongoDB: ${err}`);
  });

require("./routes/api-routes")(app);



app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
