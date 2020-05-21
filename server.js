//Install express server
const express = require('express');
const path = require('path');
const vhost = require('vhost');
const app = express();
const app2 = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/mvp-validator'));


app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/mvp-validator/index.html'));
});
app.use(vhost('test.mvp-validator-frontend.herokuapp.com/', app2));
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 3000, function () {
    console.log('Server started');
});