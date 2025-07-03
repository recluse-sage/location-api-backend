import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import locationRouter from './routes/location.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/location', locationRouter);

app.get('/', (req, res) => {
  res.send('PinSafe backend is running.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 