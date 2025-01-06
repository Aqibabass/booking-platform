const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt =require('bcryptjs')
const User = require('./models/Users.js')
require('dotenv').config()
const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json());

app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));


 mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req, res) => {
  res.json('testggh ok');
});

app.post('/register', async (req, res) => {
  try {
    console.log('Received request:', req.body);
    const { name, email, password } = req.body;
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    console.log('User created:', userDoc);
    res.json(userDoc);
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Error creating user' });
  }
});


app.listen(4000);