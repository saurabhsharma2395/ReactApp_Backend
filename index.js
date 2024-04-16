require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const userRouter = require('./src/routes/userRoutes');
const cryptoRouter = require('./src/routes/cryptoRoutes');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Dynamically allow requesting origin if credentials are needed
app.use(cors({
  origin: ['https://crypto-updated.vercel.app',
  'https://crypto-angular-project.vercel.app/'],
  credentials: true, 
}));

app.use(express.json());
app.use(cookieParser()); // Parse Cookie header and populate req.cookies

// Database connection
connectDB();

app.use('/users', userRouter);
app.use('/crypto', cryptoRouter);

app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send('Something broke!');
  });

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
