"use strict";
//@ts-check

import express from 'express';
import mongoose from 'mongoose';
const app = express();
const port = 3000;

await mongoose.connect('mongodb://user:pass@localhost:27017');
console.log(`mongodb connected, in ${mongoose.connection.host}`);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
