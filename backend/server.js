const mongoose = require('mongoose');

process.on('uncaughtException', err => {
  console.log('Unhandled exception');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

const DB = process.env.DATABASE_LOCAL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to DB!'));

const port = 3000;
const server = app.listen(port, () => {
  console.log(`App started on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('Unhandled reject');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});