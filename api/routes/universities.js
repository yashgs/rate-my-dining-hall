// routes/universities.js
const express = require('express');
const { University } = require('../models');

const router = express.Router();

// Get all universities
router.get('/', async (req, res) => {
  try {
    const universities = await University.findAll();
    res.json(universities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a university by ID
router.get('/:id', async (req, res) => {
  try {
    const university = await University.findByPk(req.params.id);
    if (!university) {
      return res.status(404).json({ error: 'University not found' });
    }
    res.json(university);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new university
router.post('/', async (req, res) => {
  try {
    const university = await University.create(req.body);
    res.status(201).json(university);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a university
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await University.update(req.body, {
      where: { uni_universityID: req.params.id },
    });
    if (updated) {
      const updatedUniversity = await University.findByPk(req.params.id);
      res.json(updatedUniversity);
    } else {
      res.status(404).json({ error: 'University not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a university
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await University.destroy({
      where: { uni_universityID: req.params.id },
    });
    if (deleted) {
      res.json({ message: 'University deleted' });
    } else {
      res.status(404).json({ error: 'University not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
