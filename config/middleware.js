// Clean the entering string
const cleanName = (req, res, next) => {
    if(req.body && req.body.name) {
        req.body.name = req.body.name.replace(/[^a-zA-Z0-9]/g, '');
    }
    
    if(req.params && req.params.name) {
        req.params.name = req.params.name.replace(/[^a-zA-Z0-9]/g, '');
    }

    next();
}


// Validate the entering data

// required field is amount, and it should be a number float when parsed
// required field name should exist and be a string
const validateData = (req, res, next) => {
    // getting the data from req
    const data = req.body;
    // check if the amount is either int or float
    if (
    typeof data.name !== "string" ||    
    isNaN(parseFloat(data.amount))
    ) {
        res.status(400).send("Invalid data");
    } else {
        next();
    }
}


module.exports = {
    cleanName,
    validateData
}