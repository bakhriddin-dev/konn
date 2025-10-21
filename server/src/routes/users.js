const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

// --- Public: get user public profile by username
// GET /api/users/:username/public
router.get("/:username/public", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select(
      "-__v -createdAt -updatedAt -email"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    // increment views
    user.incrementView();
    user.recalculateMetrics();
    await user.save();

    // send public info
    const publicProfile = {
      name: user.name,
      username: user.username,
      bio: user.bio,
      theme: user.theme,
      avatar: user.avatar,
      links: user.links.filter((l) => l.enabled), // show only enabled links
    };
    res.json(publicProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Protected: get current user info
// GET /api/users/me
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Protected: delete current user account
// DELETE /api/users/me
router.delete("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await User.findByIdAndDelete(req.user.id);

    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Protected: update profile (name, bio, username, theme, avatar)
// PUT /api/users/me
router.put("/me", auth, async (req, res) => {
  try {
    const updates = (({ name, bio, username, theme, avatar }) => ({
      name,
      bio,
      username,
      theme,
      avatar,
    }))(req.body);
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    Object.keys(updates).forEach(
      (key) => updates[key] === undefined && delete updates[key]
    );

    // If changing username, ensure uniqueness
    if (updates.username && updates.username !== user.username) {
      const exists = await User.findOne({ username: updates.username });
      if (exists)
        return res.status(400).json({ message: "Username already taken" });
    }

    Object.assign(user, updates);
    user.recalculateMetrics();
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------- Links CRUD (all protected) ----------

// Add a link
// POST /api/users/me/links
// body: { title, url, icon?, enabled? }
router.post("/me/links", auth, async (req, res) => {
  try {
    const { title, url, icon, enabled } = req.body;
    if (!title || !url)
      return res.status(400).json({ message: "title and url required" });

    const user = await User.findById(req.user.id);
    user.links.push({
      title,
      url,
      icon: icon || "",
      enabled: typeof enabled === "boolean" ? enabled : true,
    });
    user.recalculateMetrics();
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /me/links/order
router.put("/me/links/order", auth, async (req, res) => {
  try {
    const { links: updatedLinks } = req.body;
    const user = await User.findById(req.user.id);

    user.links = updatedLinks;

    user.recalculateMetrics();
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a link by id
// PUT /api/users/me/links/:linkId
// body: { title?, url?, icon?, enabled? }
router.put("/me/links/:linkId", auth, async (req, res) => {
  try {
    const { linkId } = req.params;
    const user = await User.findById(req.user.id);
    const link = user.links.find((l) => l.id === linkId);
    if (!link) return res.status(404).json({ message: "Link not found" });

    const { title, url, icon, enabled } = req.body;
    if (title !== undefined) link.title = title;
    if (url !== undefined) link.url = url;
    if (icon !== undefined) link.icon = icon;
    if (enabled !== undefined) link.enabled = enabled;

    user.recalculateMetrics();
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a link by id
// DELETE /api/users/me/links/:linkId
router.delete("/me/links/:linkId", auth, async (req, res) => {
  try {
    const { linkId } = req.params;
    const user = await User.findById(req.user.id);
    const initialLen = user.links.length;
    user.links = user.links.filter((l) => l.id !== linkId);
    if (user.links.length === initialLen)
      return res.status(404).json({ message: "Link not found" });

    user.recalculateMetrics();
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Endpoint to register a click on a link (public)
// POST /api/users/:username/click
// body: { linkId }
// This endpoint increments the particular link's clicks and updates user's totalClicks & clickRetention
router.post("/:username/click", async (req, res) => {
  try {
    const { username } = req.params;
    const { linkId } = req.body;
    if (!linkId) return res.status(400).json({ message: "linkId required" });

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const link = user.links.find((l) => l.id === linkId);
    if (!link) return res.status(404).json({ message: "Link not found" });

    link.clicks = (link.clicks || 0) + 1;
    user.incrementClick();
    user.recalculateMetrics();
    await user.save();

    res.json({
      message: "click recorded",
      totalClicks: user.totalClicks,
      clickRetention: user.clickRetention,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// stats for last 7 days
router.get("/me/stats", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const now = new Date();
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(now.getDate() - (6 - i));
      d.setHours(0, 0, 0, 0);
      const stat = user.dailyStats.find(
        (s) => s.date.getTime() === d.getTime()
      );
      return {
        name: d.toLocaleDateString("en-EN", { day: "numeric", month: "short" }),
        views: stat?.views || 0,
        clicks: stat?.clicks || 0,
      };
    });

    res.json(last7Days);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

module.exports = router;
