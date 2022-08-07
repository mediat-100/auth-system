const express = require('express');
const app = express();

const userRouter = require('./routes/auth.route');
const adminRouter = require('./routes/admin.route');
const managerRouter = require('./routes/manager.route');
const staffRouter = require('./routes/staff.route');

// body-parser
app.use(express.json());

// auth routes
app.use('/api/v1/auth', userRouter);

// admin routes
app.use('/api/v1/admin', adminRouter)

// manager route
app.use('/api/v1/manager', managerRouter)

// staff route
app.use('/api/v1/manager', staffRouter);

module.exports = app;
