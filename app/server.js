const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('Niezłapany wyjątek, zamknięcie aplikacji');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './local-config.env' });
const app = require('./app');

const DB = process.env.DATABASE_LOCAL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Podłączenie do DB!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Aplikacja działa na porcie ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('Niezłapany reject');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});