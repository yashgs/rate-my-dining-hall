// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { sequelize } = require('./models');
const universityRoutes = require('./routes/universities');
const userRoutes = require('./routes/users');
const restaurantRoutes = require('./routes/restaurants');
const reviewRoutes = require('./routes/reviews');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/universities', universityRoutes);
app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/reviews', reviewRoutes);

// Start server after successful database connection
const PORT = 5001; //IMPORTANT make sure this matches axiosConfig.js

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
