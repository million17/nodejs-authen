const express = require('express');
require('dotenv').config();
const app = express();
const host = process.env.LOCALHOST;


app.get('/', (req, res) => {
    res.send('Hello');
})

app.listen(host, () => {
    console.log(`Server start ${host}`)
})
