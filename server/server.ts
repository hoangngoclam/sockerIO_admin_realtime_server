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
import { Client, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const deleteAllRecords = async () => {
    await prisma.client.deleteMany();
};
deleteAllRecords();
const PORT = 5000;
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

const broadcastMessageForAdmin = async () => {
    const clients: Client[] = await prisma.client.findMany();
    io.to("admin_manager").emit("clients", clients);
};

myNamespace.on("connection", async (socket) => {
    socket.on("disconnect", async () => {
        const recordExists = await prisma.client.findUnique({
            where: { socket_id: socket.id },
        });
        if (recordExists) {
            await prisma.client.delete({
                where: {
                    socket_id: socket.id,
                },
            });
            console.log("An client [disconnected]");
        } else {
            console.log("An Admin_Manager [disconnected]");
        }

        broadcastMessageForAdmin();
    });

    if (
        socket.handshake.query &&
        socket.handshake.query.type === "admin_manager"
    ) {
        console.log("An Admin_Manager [Connected]");

        socket.join("admin_manager");
        broadcastMessageForAdmin();

        socket.on("update_flag_running", async (data) => {
            await prisma.client.update({
                where: {
                    socket_id: data.socket_id,
                },
                data: {
                    message: "Is updating flag running...",
                },
            });
            io.to(data.socket_id).emit("updateFlag", data);
            console.log(`update_flag_running: ${data.socket_id}`);
            broadcastMessageForAdmin();
        });
    } else {
        const clientName: string = socket.handshake.headers.name
            ? socket.handshake.headers.name.toString()
            : "";
        if (!clientName) {
            socket.disconnect();
        }
        await prisma.client.create({
            data: {
                name: clientName,
                socket_id: socket.id,
                message: "connected",
            },
        });
        broadcastMessageForAdmin();
        // Room client {{
        // if client: create client - save to database
        // broadcast message for room admin_manager
        socket.on("message", (message) => {
            // update fill message of client record
            console.log(`Received message: ${message}`);
            // broadcast message for room admin_manager
        });

        socket.on("update_flag_running_success", async (data) => {
            // update fill is_running of client record
            await prisma.client.update({
                where: {
                    socket_id: data.socket_id,
                },
                data: {
                    is_running: data.is_running,
                    message: "Update flash success",
                },
            });
            broadcastMessageForAdmin();
            // broadcast message for room admin_manager
        });
        // }}
    }

    socket.emit("connect_success", socket.id);
});
