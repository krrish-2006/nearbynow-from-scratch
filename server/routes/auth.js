const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const User = require("../User");

const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const jwt = require("jsonwebtoken");

router.post("/google", async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ message: "Credential is required" });
    }
    const googleLogin = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = googleLogin.getPayload();
    if (!payload) {
      return res.status(400).json({ message: "There's no payload" });
    }

    const existingUser = await User.findOne({ email: payload.email });
    let user = existingUser;
    if (!existingUser) {
      user = await User.create({
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      });
    }
        const token = jwt.sign(
          {
            userId: user._id,
          },
          process.env.JWT_SECRET,
        );

        res.json({
          user,
          token,
        });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login failed" });
  }
});


module.exports = router;