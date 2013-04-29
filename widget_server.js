var io = require('socket.io').listen(8081);
var sioclient = require('socket.io-client');
var widgetScript = require('fs').readFileSync('widget_client.js');
var url = require('url');

var viewer = {};

io.configure(function () {
    io.set('resource', '/likeit');
    io.enable('browser client gzip');
});

sioclient.builder(io.transports(), function (err, siojs) {
    if (!err) {
        io.static.add('/widget.js', function (path, callback) {
            callback(null, new Buffer(siojs + ';' + widgetScript));
        });
    }
});

io.sockets.on('connection', function (socket) {
    var origin = (socket.handshake.xdomain)
        ? url.parse(socket.handshake.headers.origin).hostname : 'local';

    viewer[origin] = (viewer[origin]) || 0;
    viewer[origin]++;
    socket.join(origin);
    io.sockets.to(origin).emit('viewer', viewer[origin]);

    socket.on('disconnect', function () {
        viewer[origin]--;
        io.sockets.to(origin).emit('viewer', viewer[origin]);
    });
});
