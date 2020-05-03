var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('a user connected ');
    socket.on('drag-drop', (data) => {
        io.emit('drag-drop', data);
    });
});

http.listen(4000, () => {
    console.log('listening on *:4000');
});
