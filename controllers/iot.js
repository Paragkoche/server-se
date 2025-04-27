const Iot = require('../models/iot');
const catchAsync = require('../utils/catchAsync');

function canDonateBlood(temperature, humidity, pressure) {
    // Basic conditions for donation (customize these as needed)
    if (temperature < 36 || temperature > 37.5) {
        return "Cannot donate: Unusual body temperature.";
    }
    if (humidity < 30 || humidity > 70) {
        return "Cannot donate: Humidity levels are not suitable.";
    }
    if (pressure < 90 || pressure > 140) {
        return "Cannot donate: Blood pressure is not within the safe range.";
    }
    return "You can donate blood!";
}
exports.createIOTData = catchAsync(async (req, res, next) => {
    const { deviceId, temperature, pressure, humidity } = req.body;

    const iotData = await Iot.create({
        deviceId,
        temperature,
        pressure,
        humidity
    });

    res.status(201).json({
        success: true,
        data: iotData
    });
});

const getRandomValue = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(2);
};

exports.getIOTData = catchAsync(async (req, res, next) => {
    // Generate random natural-like values
    const randomData = {
     deviceId: 'human-' + Math.floor(Math.random() * 1000),
    temperature: getRandomValue(36.0, 37.5),  // Safe body temperature
    humidity: getRandomValue(30, 70),         // Safe humidity range
    pressure: getRandomValue(950, 1050),      // Safe atmospheric pressure
    createdAt: new Date(),
    };

    res.status(200).json({
        success: true,
        data: {
            ...randomData,
            aiSuggestion: canDonateBlood(randomData.temperature, randomData.humidity, randomData.pressure)
        },
    });
});

