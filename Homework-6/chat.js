const fs = require("fs");
const path = require("path");
const http = require("http");
const socket = require("socket.io");
const HTML_TO_DISPLAY = path.join(path.resolve(), 'chat.html');

const server = http.createServer((req, res) => {
    const readStream = fs.createReadStream(HTML_TO_DISPLAY);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    readStream.pipe(res);
}).listen(3005, 'localhost');

const io = new socket(server);

io.on('connection', (client) => {
    const userCount = io.engine.clientsCount;
    const userName = generateUserName();


    client.broadcast.emit('changeUserCount', userCount);
    client.emit('changeUserCount', userCount);


    client.emit('setName', userName);


    client.broadcast.emit('addUser', userName);


    client.on('disconnect', () => {
        client.broadcast.emit('leftUser', userName);
        client.broadcast.emit('changeUserCount', io.engine.clientsCount);
    });

    client.on('newMessage', (payload) => {
        const msg = {
            user: userName,
            text: payload
        };
        client.broadcast.emit('newChatMessage', msg);
        client.emit('newChatMessage', msg);
    });
});

const generateUserName = () => {
    return 'user#' + (Date.now()).toString().substr(-5);
};