const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
const mysql = require('mysql');

// Connect to MySQL

const con = require('./models/db');

// APIs

app.use('/api/auth/',require('./routes/authRoutes'));
app.use('/api/student/',require('./routes/studentRoutes'));
app.use('/api/admin/',require('./routes/adminRoutes'));

// Run the port on 4000

const port = process.env.PORT || 4000;
app.listen(port);
