const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const bloodRequestRoutes = require('./routes/blood-request');
const notificationRoutes = require('./routes/notification');
const userRoutes = require('./routes/user');
const errorHandler = require('./middlewares/error');
const iotRoutes = require('./routes/iot');
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/blood-request', bloodRequestRoutes);
app.use('/api/v1/notification', notificationRoutes);
app.use('/api/v1/user', userRoutes);
app.use("/api/v1/iot", iotRoutes)

// Error Handler
app.use(errorHandler);

module.exports = app;
