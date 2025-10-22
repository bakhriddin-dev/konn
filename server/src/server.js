require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch(err => {
    console.error('DB connection failed', err);
    process.exit(1);
  });
