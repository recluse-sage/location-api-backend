import express from 'express';
import { reverseGeocode } from '../utils/geocode.js';
import { sendLocationEmail } from '../utils/mailer.js';
import Location from '../models/Location.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { latitude, longitude, email } = req.body;
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'Unknown';
    const address = await reverseGeocode(latitude, longitude);
    const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const location = new Location({
      address,
      latitude,
      longitude,
      ipAddress,
      mapLink,
      email,
    });
    await location.save();
    await sendLocationEmail({
      to: email,
      address,
      latitude,
      longitude,
      ipAddress,
      mapLink,
    });
    res.json({ success: true, address, mapLink });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router; 