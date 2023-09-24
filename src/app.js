const Moralis = require("moralis").default;
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const router = require("./routes/user.routes");
app.use(cors({ origin: process.env.REACT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//common routes
app.use("/", router);

app.use("/home", (req, res) => {
  res.send("This is testing Home page")
})

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(`Error: ${error}`);
  }

  try {
    await Moralis.start({
      apiKey: process.env.MORALIS_API_KEY,
    });
    console.log(`Connected with Moralis`);
  } catch (error) {
    console.log(`Error: ${error}`);
  }


  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
};

startServer();
