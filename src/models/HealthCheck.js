const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const HealthCheck = sequelize.define('HealthCheck', {
  check_id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  check_datetime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'health_checks',
  timestamps: false,
});

module.exports = HealthCheck;
