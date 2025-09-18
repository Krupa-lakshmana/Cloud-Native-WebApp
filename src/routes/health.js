const express = require('express');
const HealthCheck = require('../models/HealthCheck');
const router = express.Router();

// GET /healthz
router.get('/health', async (req, res) => {
  try {
    // Reject if payload exists
    if (req.headers['content-length'] && parseInt(req.headers['content-length']) > 0) {
      return res.status(400).set('Cache-Control', 'no-cache').send();
    }

    const record = await HealthCheck.create({});
    if (record) {
      return res.status(200).set('Cache-Control', 'no-cache').send();
    } else {
      return res.status(503).set('Cache-Control', 'no-cache').send();
    }
  } catch (error) {
    return res.status(503).set('Cache-Control', 'no-cache').send();
  }
});

// Reject non-GET methods
router.all('/health', (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).set('Cache-Control', 'no-cache').send();
  }
});

module.exports = router;
