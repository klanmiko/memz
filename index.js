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
var morgan = require('morgan');

passport.serializeUser(Auth.serializeUser);
passport.deserializeUser(Auth.deserializeUser);

app.set('view-engine', 'ejs');

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

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({secret: config.secret, resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('tiny'));

passport.use(new LocalStrategy(
  Auth.authenticate
));

app.get('/login', function(req, res) {
    if(req.user) return res.redirect(req.query.back || "/");
    res.sendFile(path.join(__dirname, 'login/index.html'));
});

app.get('/login', function(error, req, res, next){
    console.log("error handler");
    if(error) console.error(error);
    next();
})

app.get('/logout', function(req, res){
    if(req.user) {
        req.logout();
        return res.redirect(req.query.back || "/");
    }
    res.redirect(req.query.back || "/");
})

app.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), function(req, res) {
    let redirect = req.query.back || '/';
    res.json({redirect: redirect});
    //res.redirect("/login")
});

app.get('/submit', function(req, res) {
    if(req.user)
        res.sendFile(path.join(__dirname, 'submit/index.html'));
    else   
        res.redirect("/login");
});

app.use('/api', apiRouter);

app.get('/*', function(req, res) {
    var obj = req.user ? {username: req.user.username} : null;
    return res.render(path.join(__dirname, 'template/index.ejs'), {usrInfo: JSON.stringify(obj)});
});
http.createServer(app).listen(8080);
