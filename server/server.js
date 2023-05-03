
const Server = require("socket.io");

const io = Server(3000, {
    cors: { origin: "*" }
});

io.on("connection", (socket) => {
    console.log('a user connected');

    socket.on('message', (message) =>     {
        console.log(message);
        io.emit('message', `${socket.id.substr(0,2)} said ${message}` );   
    });
});