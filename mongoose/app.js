const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const errorController = require('./controllers/error');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/admin', adminRouter);
app.use(shopRouter);

app.use(errorController.get404);

mongoose.connect('mongodb://127.0.0.1:27017/shop')
    .then(response => {
        console.log('Connected!');
        app.listen(3000);
    }).catch(error => {
        console.log(error);
});