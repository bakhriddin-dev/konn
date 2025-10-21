const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const LinkSchema = new mongoose.Schema(
  {
    id: { type: String, default: () => uuidv4() },
    title: { type: String, required: true },
    url: { type: String, required: true },
    icon: { type: String, default: "" },
    enabled: { type: Boolean, default: true },
    clicks: { type: Number, default: 0 },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, unique: true, sparse: true },
    bio: { type: String, default: "" },
    theme: { type: String, default: "default" },
    avatar: { type: String, default: "" },
    views: { type: Number, default: 0 },
    links: { type: [LinkSchema], default: [] },
    totalClicks: { type: Number, default: 0 },
    clickRetention: { type: Number, default: 0 },
    dailyStats: {
      type: [
        {
          date: { type: Date, required: true },
          views: { type: Number, default: 0 },
          clicks: { type: Number, default: 0 },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

UserSchema.methods.recalculateMetrics = function () {
  const total = (this.links || []).reduce((acc, l) => acc + (l.clicks || 0), 0);
  this.totalClicks = total;
  this.clickRetention =
    this.views === 0 ? 0 : Math.min(100, (total / this.views) * 100);
  return;
};

UserSchema.methods.incrementView = function () {
  this.views += 1;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let stat = this.dailyStats.find((s) => s.date.getTime() === today.getTime());
  if (!stat) {
    stat = { date: today, views: 0, clicks: 0 };
    this.dailyStats.push(stat);
  }
  stat.views += 1;
};

UserSchema.methods.incrementClick = function () {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let stat = this.dailyStats.find((s) => s.date.getTime() === today.getTime());
  if (!stat) {
    stat = { date: today, views: 0, clicks: 0 };
    this.dailyStats.push(stat);
  }
  stat.clicks += 1;
};

module.exports = mongoose.model("User", UserSchema);
