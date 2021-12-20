const logger = require('./common/logging');

// uncaughtException is been catching by Winston
process.on('unhandledRejection', reason => {
  process.emit('uncaughtException', reason);
});

const mongoose = require('mongoose');
const { SERVER_PORT, MONGO_PORT } = require('./common/config');
const app = require('./app');

mongoose.connect( `mongodb://mongo:${MONGO_PORT}/rs-lang`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', () => logger.error('MongoDB connection error:')).once(
  'open',
  () => {
    logger.info('Successfully connect to DB');
    app.listen(SERVER_PORT, () =>
      logger.info(`App is running on http://localhost:${SERVER_PORT}`)
    );
  }
);
