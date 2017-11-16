const http = require('http');
const express = require('express');
var app = express();
var apiRouter = require('./api/routes.js');
var path = require('path');
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config");
var compiler = webpack(webpackConfig);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var config = require('./config.js');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Auth = require('./db/users.js');
var postController = require('./posts/controller.js');
var morgan = require('morgan');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser(config.secret));
app.use(session());
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('tiny'));

passport.use(new LocalStrategy(
  Auth.authenticate
));
process.env.NODE_ENV = process.env.NODE_ENV || "development";
console.log("Environment: " + process.env.NODE_ENV);
if(process.env.NODE_ENV == "development"){
    app.use(webpackDevMiddleware(compiler, {
        publicPath: "/dist" // Same as `output.publicPath` in most cases.
    }));
}
else {
    app.use('/dist', express.static(path.join(__dirname, '/dist')));
}
app.use('/api', apiRouter);

app.get('/posts', postController.get);
app.get('/posts/:id', postController.getPost);
app.get('/submit', passport.authenticate('local', {failureRedirect: '/login'}), function(req, res){
    res.sendFile(path.join(__dirname, 'submit/index.html'));
});
app.get('/login', function(req, res){
    res.sendFile(path.join(__dirname, 'login/index.html'));
})
app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
});
http.createServer(app).listen(8080);
