const express = require('express');
const morgan = require('morgan');
const cron = require('node-cron');

const userRouter = require('./routes/userRoutes');
const stopRouter = require('./routes/stopRoutes');
const StopModel = require('./models/stopModel');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

cron.schedule('0 0 * * *', () => {
  console.log('Stops loaded to cache');
  StopModel.syncStops()
});

StopModel.syncStops()

app.use('/api/users', userRouter);
app.use('/api/stops', stopRouter);

module.exports = app;