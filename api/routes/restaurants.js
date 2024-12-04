// routes/restaurants.js
const express = require('express');
const { Restaurant, Review } = require('../models');

const router = express.Router();

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a restaurant by ID
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id, {
      include: [Review],
    });
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new restaurant
router.post('/', async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a restaurant
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Restaurant.update(req.body, {
      where: { res_restaurantID: req.params.id },
    });
    if (updated) {
      const updatedRestaurant = await Restaurant.findByPk(req.params.id);
      res.json(updatedRestaurant);
    } else {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a restaurant
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Restaurant.destroy({
      where: { res_restaurantID: req.params.id },
    });
    if (deleted) {
      res.json({ message: 'Restaurant deleted' });
    } else {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
