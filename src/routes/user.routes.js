const express = require("express");
const {
  authRequest,
  verify,
  authenticate,
  logout,
  sendSeedDetails,
} = require("../controllers/auth.controller");
const router = express.Router();

router.route("/request-message").post(authRequest);
router.route("/verify").post(verify);
router.route("/authenticate").get(authenticate);
router.route("/logout").get(logout);

router.route("/send-seeddetails").post(sendSeedDetails);

module.exports = router;
