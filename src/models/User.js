const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const LinkSchema = new mongoose.Schema({
  id: { type: String, default: () => uuidv4() },
  title: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String, default: '' },
  enabled: { type: Boolean, default: true },
  clicks: { type: Number, default: 0 }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true, sparse: true },
  bio: { type: String, default: '' },
  theme: { type: String, default: 'default' },
  avatar: { type: String, default: '' },
  views: { type: Number, default: 0 },
  links: { type: [LinkSchema], default: [] },
  totalClicks: { type: Number, default: 0 },
  clickRetention: { type: Number, default: 0 }
}, { timestamps: true });

UserSchema.methods.recalculateMetrics = function() {
  const total = (this.links || []).reduce((acc, l) => acc + (l.clicks || 0), 0);
  this.totalClicks = total;
  this.clickRetention = this.views === 0 ? 0 : Math.min(100, (total / this.views) * 100);
  return;
};

module.exports = mongoose.model('User', UserSchema);
