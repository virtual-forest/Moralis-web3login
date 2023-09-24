const Moralis = require("moralis").default;
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const router = require("./routes/user.routes");



  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
};

startServer();
