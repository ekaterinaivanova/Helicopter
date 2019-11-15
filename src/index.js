// const express = require('express')
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { Server } from 'http';
import routes from './routes/routes';

const dbName = process.env.NODE_ENV === 'dev' ? 'database-test' : 'database';
const url = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${dbName}:27017?authMechanism=SCRAM-SHA-1&authSource=admin`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  reconnectTries: 60,
  reconnectInterval: 1000,
};

const port = process.env.PORT || 80;
const app = express();
const http = Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);
app.use((req, res) => {
  res.status(404);
});
mongoose.connect(url, options).then(
  () => {
    http.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Listening on port ${port}`);
      app.emit('APP_STARTED');
    });
  },
  (err) => {
    // eslint-disable-next-line no-console
    console.log(`FATAL MONGODB CONNECTION ERROR: ${err}:${err.stack}`);
    process.exit(1);
  },
);
module.exports = app;
