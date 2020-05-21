//Install express server
const express = require('express');
const path = require('path');
const vhost = require('vhost');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/mvp-validator'));

app.use(vhost('*.*', function handle(req, res, next) {
    console.dir('server subdomain: ' + req.vhost[0]) // => 'foo'
    res.sendFile(path.join(__dirname + '/dist/mvp-validator/index.html'));
}))

/* app.get('*', function (req, res) {
    console.log('TEST TEST TEST');
    res.sendFile(path.join(__dirname + '/dist/mvp-validator/index.html'));
}); */


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 3000, function () {
    console.log('Server started');
});