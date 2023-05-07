import { Client } from "@prisma/client";

// types for the namespace named "/my-namespace"
export interface NamespaceSpecificClientToServerEvents {
    message: (arg: string) => void;
    update_flag_running: (arg: {
        socket_id: string;
        is_running: boolean;
    }) => void;
    update_flag_running_success: (arg: {
        socket_id: string;
        is_running: boolean;
    }) => void;
}

export interface NamespaceSpecificServerToClientEvents {
    message: (arg: string) => void;
    connect_success: (arg: string) => void;
    clients: (arg: string) => void;
}
