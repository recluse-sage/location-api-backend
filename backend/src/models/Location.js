import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  address: String,
  latitude: Number,
  longitude: Number,
  ipAddress: String,
  mapLink: String,
  email: String,
});

export default mongoose.model('Location', LocationSchema); 