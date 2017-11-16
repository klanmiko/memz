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

app.set('view-engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser(config.secret));
app.use(session({secret: config.secret}));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('tiny'));

passport.use(new LocalStrategy(
  Auth.authenticate
));

passport.serializeUser(Auth.serializeUser);
passport.deserializeUser(Auth.deserializeUser);

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

app.get('/login', function(req, res){
    res.sendFile(path.join(__dirname, 'login/index.html'));
});

app.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login', failureFlash: true}));

app.get('/submit', passport.authenticate('local', {failureRedirect: '/login'}), function(req, res) {
    res.sendFile(path.join(__dirname, 'submit/index.html'));
});

app.use('/api', apiRouter);

app.get('/posts', postController.get);

app.get('/posts/:id', postController.getPost);

app.get('/*', function(req, res, next) {
    passport.authenticate('local', function(error, user, info) {
        if(error) console.error(error);
        let usrInfo = user || null;
        return res.render(path.join(__dirname, 'template/index.ejs'), {usrInfo: JSON.stringify(usrInfo)});
    })(req, res, next);
});
http.createServer(app).listen(8080);
