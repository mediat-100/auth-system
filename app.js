const express = require('express');
const app = express();

const userRouter = require('./routes/auth.route');
const adminRouter = require('./routes/admin.route');

// body-parser
app.use(express.json());

// auth routes
app.use('/api/v1/auth', userRouter);

// admin routes
app.use('/api/v1/admin', adminRouter)

module.exports = app;
