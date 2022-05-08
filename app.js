const express = require('express');
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload');


const pageRoute = require('./routes/pageRoute')
const productRoute = require('./routes/productRoute')
const categoryRoute = require('./routes/categoryRoute')


const app = express();

//Db Connection
mongoose
  .connect('mongodb://localhost/furniture-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
    //useCreateIndex: true
  })
  .then(() => {
    console.log('SUCCESSFUL DB CONNCECTION');
  });

//Template Engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"))
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(fileUpload());

//Routes
app.use('/', pageRoute);
app.use('/products', productRoute)
app.use('/categories', categoryRoute)

const port = 3000;
app.listen(port, () => {
  console.log(`App Listened PORT: ${port}`);
});
