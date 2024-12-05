// routes/reviews.js
const express = require('express');
const { Review } = require('../models');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get reviews for a specific restaurant
router.get('/restaurant/:restaurantId', async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { rev_restaurantid: req.params.restaurantId },
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GEts review for specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { rev_userid: req.params.userId },
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a review by ID
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const review = await Review.create({
      ...req.body,
      rev_userID: req.user.userId,
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (review.rev_userID !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    const [updated] = await Review.update(req.body, {
      where: { rev_reviewID: req.params.id },
    });
    if (updated) {
      const updatedReview = await Review.findByPk(req.params.id);
      res.json(updatedReview);
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a review
router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (review.rev_userID !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    const deleted = await Review.destroy({
      where: { rev_reviewID: req.params.id },
    });
    if (deleted) {
      res.json({ message: 'Review deleted' });
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
