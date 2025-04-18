const mongoose = require('mongoose');
const IOT = new mongoose.Schema(
    {
        deviceId: {
            type: String,
            required: [true, 'Device ID is required'],
            unique: true
        },
        temperature: {
            type: Number,
            required: [true, 'Temperature is required']
        },
        pressure: {
            type: Number,
            required: [true, 'Pressure is required']
        },
        humidity: {
            type: Number,
            required: [true, 'Humidity is required']
        },
        createdAt: { type: Date, default: Date.now }
    },
    { toJSON: { virtuals: true } }
);


module.exports = mongoose.model('IOT', IOT);