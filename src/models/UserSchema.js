const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    profileId: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    location: {
      type: String,
    },
    username: {
      type: String,
    },
    level: {
      type: Number,
    },
    nftsEarned: {
      type: Number,
    },
    Seed: [
      {
        type: Number, //ref to user's seedId
      },
    ],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

const User = mongoose.model("User", userSchema);

// Define the seed database schema
const seedSchema = new mongoose.Schema(
  {
    profileId: {
      type: String,
      required: true,
    },
    seedId: {
      type: Number,
      require: true,
    },
    stage: {
      type: String,
      default: "Seed Stage",
    },
    latLong: {
      type: String,
    },
    hrsToDie: {
      type: Date, // Use Date type for timestamps
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // Default to 24 hours from the current timestamp
    },
    isDead: {
      type: Boolean,
      default: false,
    },
    isTree: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

const Seed = mongoose.model("Seed", seedSchema);

module.exports = {
  User,
  Seed,
};
