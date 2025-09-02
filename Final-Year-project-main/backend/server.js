const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const foundItemRoutes = require('./routes/foundITEMSroute');
const lostItemRoutes = require('./routes/lostITEMSroute');





const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/pumart')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ DB connection failed', err));

app.use('/api/lostitems', lostItemRoutes);
app.use('/api/founditems', foundItemRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
