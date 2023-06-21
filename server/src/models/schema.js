const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
});

const flightSchema = new mongoose.Schema({
    airline: { type: String, required: true },
    flightNumber: { type: String, required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    departureTime: { type: Date, required: true },
    reservedSeats: [{type: String, default:0}],
    arrivalTime: { type: Date, required: true },
    price: { type: Number, required: true },
    seatsAvailable: { type: Number, required: true }
});

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
    passengers: [{ type: String, required: true }],
    totalPrice: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    seatNumbers: [{ type: String, required: true }],
    baggageOptions: { type: String, required: false },
    paymentMethod: { type: String, required: true },
});

const models = {
    Users: mongoose.model('Users', userSchema),
    Flight: mongoose.model('Flight', flightSchema),
    Booking: mongoose.model('Booking', bookingSchema)
}

module.exports = models;