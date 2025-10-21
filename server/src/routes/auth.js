const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// POST /api/auth/google
// body: { idToken }
router.post('/google', async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ message: 'idToken required' });

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    // payload has: email, email_verified, name, picture, sub (google id), etc.
    if (!payload.email_verified) {
      return res.status(400).json({ message: 'Google account not verified' });
    }

    const email = payload.email;
    const name = payload.name || '';
    const avatar = '';

    // find or create user
    let user = await User.findOne({ email });

    if (!user) {
      // create with default username (maybe user will change later)
      const baseUsername = email.split('@')[0];
      // ensure uniqueness of username (append random if taken)
      let username = baseUsername;
      let i = 0;
      while (await User.findOne({ username })) {
        i += 1;
        username = baseUsername + i;
      }

      user = new User({
        name,
        email,
        username,
        avatar
      });
      user.recalculateMetrics();
      await user.save();
    } else {
      // update fields from google if desired (e.g., name/avatar)
      let changed = false;
      if (user.name !== name) { user.name = name; changed = true; }
      if (user.avatar !== avatar) { user.avatar = avatar; changed = true; }
      if (changed) {
        user.recalculateMetrics();
        await user.save();
      }
    }

    // issue JWT
    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // return user summary + token
    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      theme: user.theme,
      avatar: user.avatar,
      views: user.views,
      totalClicks: user.totalClicks,
      clickRetention: user.clickRetention,
      links: user.links
    };

    res.json({ token, user: safeUser });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid Google token' });
  }
});

module.exports = router;
