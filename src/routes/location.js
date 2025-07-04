import express from 'express';
import { reverseGeocode } from '../utils/geocode.js';
import { sendLocationEmail } from '../utils/mailer.js';
import Location from '../models/Location.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { latitude, longitude, email, name } = req.body;
    
    // Debug logging
    console.log('Received request body:', req.body);
    console.log('Extracted data:', { latitude, longitude, email, name });
    
    // Validate and convert coordinates to numbers
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    
    console.log('Parsed coordinates:', { lat, lng });
    
    if (isNaN(lat) || isNaN(lng)) {
      console.error('Invalid coordinates:', { latitude, longitude });
      return res.status(400).json({ success: false, error: 'Invalid coordinates' });
    }
    
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'Unknown';
    const address = await reverseGeocode(lat, lng);
    const mapLink = `https://www.google.com/maps?q=${lat},${lng}`;
    
    // Debug logging
    console.log('Processed data:', { address, ipAddress, mapLink });
    
    const location = new Location({
      address,
      latitude: lat,
      longitude: lng,
      ipAddress,
      mapLink,
      email,
      name,
    });
    await location.save();
    
    // Debug logging before sending email
    console.log('Sending email with data:', { to: email, address, latitude: lat, longitude: lng, ipAddress, mapLink, name });
    
    await sendLocationEmail({
      to: email,
      address,
      latitude: lat,
      longitude: lng,
      ipAddress,
      mapLink,
      name,
    });
    res.json({ success: true, address, mapLink });
  } catch (err) {
    console.error('Error in location route:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router; 