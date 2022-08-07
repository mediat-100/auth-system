const express = require('express');
const app = express();

const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');

// body-parser
app.use(express.json());

// user routes
app.use('/api/v1/users',userRouter )

// auth routes
app.use('/api/v1/auth', authRouter);

module.exports = app;
