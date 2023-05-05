// types for the namespace named "/my-namespace"
export interface NamespaceSpecificClientToServerEvents {
    message: (arg: string) => void;
    update_flag_running: (arg: string) => void;
    update_flag_running_success: (arg: string) => void;
}

export interface NamespaceSpecificServerToClientEvents {
    message: (arg: string) => void;
    connect_success: (arg: string) => void;
}
