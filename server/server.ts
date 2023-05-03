import { Namespace, Server } from "socket.io";
import {
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData,
} from "./interfaces/sockerTypeInterface";
import {
    NamespaceSpecificClientToServerEvents,
    NamespaceSpecificServerToClientEvents,
} from "./interfaces/sockerTransferInterface";

const PORT = 3000;
const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(PORT, {
    cors: { origin: "*" },
});
console.log(`Server running on port ${PORT}`);
const myNamespace: Namespace<
    NamespaceSpecificClientToServerEvents,
    NamespaceSpecificServerToClientEvents
> = io.sockets;

myNamespace.on("connection", (socket) => {
    console.log(`Connected: ${socket}`);
    // Check socket connect is client or admin_manager
    // if client: create client - save to database
    // broadcast message for room admin_manager

    // Room client {{
    socket.on("message", (message) => {
        // update fill message of client record
        console.log(`Received message: ${message}`);
        // broadcast message for room admin_manager
    });

    socket.on("update_flag_running_success", (message) => {
        // update fill is_running of client record
        console.log(`Update_flag_running_success: ${message}`);
        // broadcast message for room admin_manager
    });
    // }}

    // Room admin_manager {{
    socket.on("update_flag_running", (message) => {
        console.log(`Received message: ${message}`);
        // broadcast message for room admin_manager
    });
    // }}

    socket.emit("connect_success", socket.id);
});

myNamespace.on("disconnect", (socket) => {
    //remove client from list where socket_id = socket.id
    console.log(`disconnect socket: ${socket.id}`);
    // broadcast message for room admin_manager
});
