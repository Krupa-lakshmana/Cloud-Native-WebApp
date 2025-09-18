require('dotenv').config();
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 8080;

// Setup database connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  logging: false, // disable SQL logs
});

// Define HealthCheck model
const HealthCheck = sequelize.define('HealthCheck', {
  check_id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  check_datetime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  tableName: 'health_checks',
  timestamps: false,
});

// Middleware to parse JSON
app.use(express.json());

// Health Check Endpoint
app.get('/healthz', async (req, res) => {
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
app.all('/healthz', (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).set('Cache-Control', 'no-cache').send();
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('Cloud-Native WebApp running! Visit /healthz for health check.');
});

// Start server and sync database
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    await sequelize.sync(); // auto-create tables
    console.log('✅ Tables synced');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to database:', error);
  }
})();
