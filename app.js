// Require section for
// all packages and framework
const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('express-error-handler');
const bodyParser = require('body-parser');

// require the envelopeRouter
const envelopeRouter = require('./routes/envelopeRouter');

// require the apiRouter
const apiRouter = require('./server/api');

// Apply CORS to all routes
app.use(cors());

// Parse to all routes
app.use(bodyParser.json());

// error handler by default
app.use(errorHandler());

// Mount the API router
app.use('/api', apiRouter);

// mount envelopeRouter
app.use('/envelope', envelopeRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening at port: ${PORT}`);
})