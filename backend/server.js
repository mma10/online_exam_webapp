const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

// Connect to MySQL

const con = require('./models/db');
const myFunc = setInterval(() => {
    // Write dummy query

    const uname = "himanshu";
    con.query("SELECT * from management where uname = ?",[uname]);
},5000);

app.use(cors());

// APIs

app.use('/api/auth/',require('./routes/authRoutes'));
app.use('/api/student/',require('./routes/studentRoutes'));
app.use('/api/admin/',require('./routes/adminRoutes'));
app.use('/api/invigilator/',require('./routes/invigilatorRoutes'));

// Run the port on 4000

const port = process.env.PORT || 4000;
app.listen(port);
