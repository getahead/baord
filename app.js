var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    action = require('./routes/action'),
    auth = require('./routes/auth'),
    app;

app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'kanban-board session-secret-name',
    resave: true,
    saveUninitialized: true
}));

app.use(require('./resources/lib/middleware/loadUser'));
app.use('/action', action);
app.use('/auth', auth);

app.get('*', function(req, res) {

    res.sendFile("index.html", {
        root: __dirname + '/public/html',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent'     : true
        }
    }, function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
    });
});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
