const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const app = express();
const { authenticationRouter } = require("./routes/authenticate");
const { quizRouter } = require("./routes/quiz");

//port of server
const PORT = process.env.PORT || 5000
//connect to db
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true}
)
.then(()=>console.log('connected'))
.catch(e=>console.log(e));

//setup cors
app.use(cors());
app.use(bodyParser.json());

//setup routes
app.use("/authenticate", authenticationRouter);
app.use("/quiz", quizRouter);

//setup cors

//home page
app.get("/", (req, res) => {
  res.status(200).send(`<h1>Hello from backend</h1>`);
});

//
app.use(express.static("client/build"));

//start the server
app.listen(PORT, () => {
  console.log("Backend server started");
});