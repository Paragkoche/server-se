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

exports.getIOTData = catchAsync(async (req, res, next) => {
    const iotData = await Iot.find({}).sort({ createdAt: -1 }).limit(1);

    res.status(200).json({
        success: true,
        data: {
            deviceId: iotData[0].deviceId,
            temperature: iotData[0].temperature,
            pressure: iotData[0].pressure,
            humidity: iotData[0].humidity,
            createdAt: iotData[0].createdAt,
            aiSuggestion: canDonateBlood(iotData[0].temperature, iotData[0].humidity, iotData[0].pressure)

        },
    });
});
