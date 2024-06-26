const express = require('express');
const path= require('path')
const app = express();
const sample=require('./models/vehicledetails')
const dotenv=require('dotenv')
const mongoose = require('mongoose');
const uri=process.env.mongodb_uri;
mongoose.connect(uri)
const bodyParser =require('bodyParser')



const PORT = 3005;

app.use(bodyParser.json());



const database = mongoose.connection;
database.on("error",(error) => {
    console.log(error);
});

database.once("connected", () =>{
    console.log("database connected");
});


    


// GET all vehicles
app.get('/vehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new vehicle
app.post('/vehicles', async (req, res) => {
  const vehicle = new Vehicle(req.body);
  try {
    const newVehicle = await vehicle.save();
    res.status(201).json(newVehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) a vehicle
app.put('/vehicles/:id', async (req, res) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedVehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a vehicle
app.delete('/vehicles/:id', async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: 'Vehicle deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
