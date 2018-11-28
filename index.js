var express = require('express');
var createError = require('http-errors');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
//var cookieParser = require('cookie-parser');
require('dotenv').config();

//import routes
var todoRouter = require('./routes/todo/todo-routes');
var indexRouter = require('./routes/indexRouter');
var bathroomRouter = require('./routes/bathrooms/bathroomRouter');

mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MONGODB CONNECTED'))
  .catch(err => console.log(err));

//configuration
var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json()); //body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
const port = process.env.PORT || 3000;
// app.use(cookieParser());

//CORS without the CORS module........
// app.use(function(req,res,next){
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   })

//Routes
app.use('/', indexRouter);
app.use('/bathrooms', bathroomRouter);
app.use('/todo', todoRouter);

//404 error
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
