/* eslint-disable react-hooks/exhaustive-deps */
import Alert from "@/components/Alert";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

type AlertType = {
    type: "success" | "error" | "warning";
    message: string;
};
type Client = {
    id: number;
    socket_id: string;
    name: string;
    is_running: boolean;
    message: string;
};

const IndexPage = () => {
    const [isShowNoti, setShowNoti] = useState(false);
    const [alert, setAlert]: [AlertType, Function] = useState({
        type: "success",
        message: "",
    });
    const [clients, setClients]: [Client[], Function] = useState([]);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket: Socket = io("ws://localhost:5000", {
            query: {
                type: "admin_manager",
            },
        });
        setSocket(newSocket);
        newSocket.on("connect", () => {
            console.log("Connected to server");
            showAlert({
                type: "success",
                message: "Connect server thành công",
            });
        });

        newSocket.on("clients", (clients: any) => {
            console.log("Receive some clients");
            console.log("clients: ", clients);
            setClients(clients);
        });

        newSocket.on("disconnect", () => {
            console.log("Disconnected from server");
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const updateClientStatus = (socketId: string, currenState: boolean) => {
        const newState = !currenState;
        socket?.emit("update_flag_running", {
            socket_id: socketId,
            is_running: newState,
        });
    };

    const showAlert = (alert: AlertType) => {
        setAlert(alert);
        setShowNoti(true);
        setTimeout(() => {
            setShowNoti(false);
        }, 5000);
    };

    return (
        <div className="container mt-5 mx-auto">
            {isShowNoti ? (
                <Alert type={alert.type} message={alert.message} />
            ) : (
                ""
            )}

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Socket ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Message
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((item, index) => {
                            return (
                                <tr key={index} className="bg-white border-b">
                                    <td className="px-6 py-4">
                                        {item.socket_id}
                                    </td>
                                    <td className="px-6 py-4">{item.name}</td>
                                    <td className="px-6 py-4">
                                        {item.message}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.is_running ? (
                                            <button
                                                type="button"
                                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 
                                                    focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                                onClick={() => {
                                                    updateClientStatus(
                                                        item.socket_id,
                                                        item.is_running
                                                    );
                                                }}
                                            >
                                                Stop
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium 
                                                    rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
                                                onClick={() => {
                                                    updateClientStatus(
                                                        item.socket_id,
                                                        item.is_running
                                                    );
                                                }}
                                            >
                                                Open
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default IndexPage;
