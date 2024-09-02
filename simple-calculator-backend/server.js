const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//Addition endpoint
app.post('/add', (req, res) => {
    const num1 = parseFloat(req.body.number1) || 0;
    const num2 = parseFloat(req.body.number2) || 0;
    const result = num1 + num2;
    let formattedResult;

    if (!Number.isFinite(result) || Math.abs(result) > 1e15 || Math.abs(result) < 1e-6) {
        formattedResult = result.toExponential(2);
    }
    else {
        formattedResult = Number.isInteger(result) ? result : result.toFixed(2);
    }
    res.json({ formattedResult });
});

//Subtraction endpoint
app.post('/subtract', (req, res) => {
    const num1 = parseFloat(req.body.number1) || 0;
    const num2 = parseFloat(req.body.number2) || 0;
    const result = num1 - num2;
    let formattedResult;

    if (!Number.isFinite(result) || Math.abs(result) > 1e15 || Math.abs(result) < 1e-6) {
        formattedResult = result.toExponential(2);
    }
    else {
        formattedResult = Number.isInteger(result) ? result : result.toFixed(2);
    }
    console.log('result is ' + result);
    res.json({ formattedResult });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log('server is running');
});