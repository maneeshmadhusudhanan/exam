const{ Schema} = require('mongoose');
const{ model}=require('mongoose');
const mongoose = require('mongoose')
const bodyParser =require('bodyParser')


const vehicleSchema = new mongoose.Schema({
    serviceNo: String,
    vehicleNo: String,
    vehicleType: String,
    serviceDate: Date,
    estimatedCompletion: Date,
    ownerName: String,
    serviceDetails: String,
  });
  
  const Vehicle = mongoose.model('Vehicle', vehicleSchema);
  module.exports=Vehicle;
  