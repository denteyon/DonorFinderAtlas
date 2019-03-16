const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require('helmet');

const publicPath = path.join(__dirname+'public');

var app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(logger('dev'));
app.use(helmet());
app.use(compression());
app.use(cookieParser());

app.use(express.static(publicPath));

app.get('/', (req, res)=>{
    res.send('Hello');
})

app.listen(port, () => {
    console.log('server is up and running');
});