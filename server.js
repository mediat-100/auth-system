require('dotenv').config({ path: './.env' });
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

// db connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connected successfully...');
  })
  .catch((err) => {
    console.log('DB connection failed!!!', err);
  });

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
