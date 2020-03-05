var express = require('express.io');
var app = express();
app.http().io();
var PORT = 5000;
console.log('The server has started' + PORT);


app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('index.ejs');
});

app.io.route('ready', function (req) {
    req.io.join(req.data)
    app.io.room(req.data).broadcast('annouce', {
        message: 'New user has joined the' + req.data + ' room'
    })

})


app.io.route('send', function (req) {

    app.io.room(req.data.room).broadcast('message', {
        message: req.data.message,
        author: req.data.author
    });

})

app.listen(PORT);
