import { Client } from "@prisma/client";
import { Buffer } from "buffer";
export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    clients: (arg: Client[]) => void;
    updateFlag: (arg: { socket_id: string; is_running: boolean }) => void;
}

export interface ClientToServerEvents {
    hello: () => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    name: string;
    age: number;
}
