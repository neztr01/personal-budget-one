// Require section for
// all packages and framework
const express = require('express');
const app = express();
const cors = require('cors');
const apiRouter = require('./server/api');
const errorHandler = require('express-error-handler');
const bodyParser = require('body-parser');


// Apply CORS to all routes
app.use(cors());

// Parse to all routes
app.use(bodyParser.json());

// Mount the API router
app.use('/api', apiRouter);

// error handler by default
app.use(errorHandler({
    log: true
}))


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is listening at port: ${PORT}`);
})