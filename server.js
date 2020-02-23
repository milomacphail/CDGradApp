const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const cors = require('cors');

const graduates = require("./routes/api/graduates");

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connected to MongoDB");
})

app.use('/api/graduates', graduates);
app.use(express.static('public')); 

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});


