const express = require("express");
const bcrypt = require('bcrypt');
const path = require("path");
const app = express();
const cors = require('cors')
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5100;
const mongoose = require('mongoose');
const { MONGO_URI } = require('./db/connect');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const models = require("./models/schema");

// app.use(bodyParser.json());
app.use(cors());

// user schema
app.post('/register', async (req, res) => {
    try {
        const { firstname, lastname,type, email, password } = req.body;
        const user = await models.Users.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user object
        const newUser = new models.Users({
            firstname,
            lastname,
            type,
            email,
            password: hashedPassword
        });

        // Save the new user to the database
        const userCreated = await newUser.save();
        console.log(userCreated, 'user created');
        return res.status(200).json({ message: 'Successfully registered' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await models.Users.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    console.log(user.type)
    if (user.type === 'owner') {
        const agentToken = jwt.sign({ userId: user._id }, 'agenttoken');
        res.json({ user, ownerToken });
    } else if (user.type === 'passenger') {
        const token = jwt.sign({ userId: user._id }, 'mysecretkey1');
        res.json({ user, token });
    } else if (user.type === 'admin') {
        const jwtToken = jwt.sign({ userId: user._id }, 'mysecretkey2');
        res.json({ user, jwtToken });
    }
});

// get users
app.get('/users', async (req, res) => {
    try {
        const users = await models.Users.find();
        res.send(users);
    } catch (error) {
        res.status(500).send('Server error');
        console.log(error);
    }
});

// Create a new flight
app.post('/flights', async (req, res) => {
    try {
        const flight = new models.Flight(req.body);
        const savedFlight = await flight.save();
        res.status(201).json(savedFlight);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


// Get a single flight by ID
app.get('/flights/:id', async (req, res) => {
    try {
        const flight = await models.Flight.findById(req.params.id);
        if (!flight) {
            return res.status(404).json({ message: 'Flight not found' });
        }
        res.json(flight);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


// Get all flights
app.get('/flights', async (req, res) => {
    try {
        const flights = await models.Flight.find();
        res.json(flights);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


app.post('/bookings', async (req, res) => {
    try {
      const newBooking = new models.Booking(req.body);
      
      const id = req.body.flight;
      const flight = await models.Flight.findById(id);
      flight.reservedSeats.push(...newBooking.seatNumbers);
    //   console.log(flight)
      const savedFlight = await flight.save();
      newBooking.flight = savedFlight._id;
  
      const savedBooking = await newBooking.save();
      res.status(201).json(savedBooking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.get('/bookings', async (req, res) => {
    try {
      const bookingDetails = await models.Booking.find();
      res.status(200).json(bookingDetails);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

app.get('/bookings/user/:userId', async (req, res) => {
    try {
      const bookingDetails = await models.Booking.findOne({ user: req.params.userId });
      res.status(200).json(bookingDetails);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.get('/bookings/flight/:flightId', async (req, res) => {
    try {
      const bookingDetails = await models.Booking.findOne({ flight: req.params.flightId });
      res.status(200).json(bookingDetails);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;