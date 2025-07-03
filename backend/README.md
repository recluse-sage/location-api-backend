# PinSafe Backend

## Setup

1. Copy `.env.example` to `.env` and fill in your credentials.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server locally:
   ```bash
   npm run dev
   ```

## Environment Variables
- `MONGODB_URI`: MongoDB Atlas connection string
- `EMAIL_USER`: Gmail address for sending emails
- `EMAIL_PASS`: Gmail app password (not your main password)
- `GEOCODE_API_KEY`: API key for geocode.maps.co

## Deploying to Render
1. Push this folder to a GitHub repo.
2. Create a new Web Service on [Render](https://render.com/).
3. Set the environment variables in the Render dashboard.
4. Use `npm start` as the start command.

## API
- `POST /api/location` — Accepts `{ latitude, longitude, email }` and sends the location email. 