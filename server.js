require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});