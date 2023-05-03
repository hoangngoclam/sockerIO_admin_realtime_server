import { Namespace, Server } from "socket.io"
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, 
    SocketData, NamespaceSpecificClientToServerEvents, NamespaceSpecificServerToClientEvents } from "./type";

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(3000, {
    cors: { origin: "*" }
});

const myNamespace: Namespace<
    NamespaceSpecificClientToServerEvents,
    NamespaceSpecificServerToClientEvents
> = io.of("/ngoc-lam");

myNamespace.on("connection", (socket) => {
    console.log(`Connected: ${socket.id}`);
    
    socket.on("message", (message) => {
        console.log(`Received message: ${message}`);
    });
    console.log("Send message");
    socket.emit("message", "123");
});

myNamespace.on("disconnect", (socket) => {
    console.log(`Disconnect: ${socket.id}`);
});