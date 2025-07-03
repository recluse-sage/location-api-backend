import axios from 'axios';

export async function reverseGeocode(lat, lon) {
  const apiKey = process.env.GEOCODE_API_KEY;
  const url = `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=${apiKey}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      },
    });
    return response.data.display_name || 'Address lookup failed';
  } catch (err) {
    return 'Address lookup failed';
  }
} 