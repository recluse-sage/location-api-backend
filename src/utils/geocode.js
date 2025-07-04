import axios from 'axios';

export async function reverseGeocode(lat, lon) {
  console.log('reverseGeocode called with:', { lat, lon });
  
  const apiKey = process.env.GEOCODE_API_KEY;
  console.log('API Key available:', !!apiKey);
  
  const url = `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=${apiKey}`;
  console.log('Geocoding URL:', url);
  
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      },
    });
    console.log('Geocoding response:', response.data);
    const address = response.data.display_name || 'Address lookup failed';
    console.log('Extracted address:', address);
    return address;
  } catch (err) {
    console.error('Geocoding error:', err.message);
    return 'Address lookup failed';
  }
} 