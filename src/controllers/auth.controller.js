const Moralis = require("moralis").default;
const jwt = require("jsonwebtoken");
const { User, Seed } = require("../models/UserSchema");
require("dotenv").config();

const config = {
  domain: process.env.APP_DOMAIN,
  statement: "Please sign this message to confirm your identity.",
  uri: process.env.REACT_URL,
  timeout: 60,
};

const authRequest = async (req, res) => {
  const { address, chain, network } = req.body;

  try {
    const message = await Moralis.Auth.requestMessage({
      address,
      chain,
      ...config,
    });

    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
};

const verify = async (req, res) => {
  try {
    const { message, signature } = req.body;

    const { address, profileId } = (
      await Moralis.Auth.verify({
        message,
        signature,
        networkType: "evm",
      })
    ).raw;

    //Store to mongodb of user informations

    // Check if a user with the same profileId already exists
    let existingUser = await User.findOne({ profileId });

    if (!existingUser) {
      // Create a new user document in MongoDB
      const newUser = new User({
        address,
        profileId,
        email: "", // Initialize email as an empty string
      });

      // Save the user document
      await newUser.save();
    }

    //create user valuable to create JWT token
    const user = { address, profileId };

    // create JWT token
    const token = jwt.sign(user, process.env.AUTH_SECRET);
    // console.log(token);

    // set JWT cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true, // Set this to true if your site is served over HTTPS
      sameSite: "none", // Necessary for cross-site cookies
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
};

const authenticate = async (req, res) => {
  const token = req.cookies.jwt;
  // console.log(token);

  if (!token) return res.sendStatus(403); // if the user did not send a jwt token, they are unauthorized

  try {
    const data = jwt.verify(token, process.env.AUTH_SECRET);
    res.json(data);
  } catch {
    return res.sendStatus(403);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.sendStatus(200);
  } catch {
    return res.sendStatus(403);
  }
};

const sendSeedDetails = async (req, res) => {
  try {
    const { tokenId, profileId } = req.body;

    // Check if a user with the same profileId already exists
    let existingUser = await User.findOne({ profileId });

    if (!existingUser) {
      return res.status(400).send("Cann't get seed properly");
    } else {
      //This is for creating seed from user
      // // Create a new seed database document and link it to the user's profileId
      const newSeed = new Seed({
        // Define other fields for your seed database here
        profileId: existingUser.profileId,
        seedId: tokenId,
      });
      // // Save the seed database document
      await newSeed.save();

      // // Add the new seed database's seed'id to the user's Seed array
      existingUser.Seed.push(newSeed.seedId);
      // // Save the updated user document
      await existingUser.save();
      res.status(200).json(newSeed.seedId);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
};

module.exports = { authRequest, verify, authenticate, logout, sendSeedDetails };
