import Alert from "@/components/Alert";
import { useEffect, useState } from "react";
import io from "socket.io-client";

type AlertType = {
    type: "success" | "error" | "warning";
    message: string;
};

const IndexPage = () => {
    const [isShowNoti, setShowNoti] = useState(false);
    const [alert, setAlert]: [AlertType, Function] = useState({
        type: "success",
        message: "",
    });
    useEffect(() => {
        const socket = io("ws://localhost:5000", {
            query: {
                type: "admin_manager",
            },
        });

        socket.on("connect", () => {
            console.log("Connected to server");
            showAlert({
                type: "success",
                message: "Connect server thành công",
            });
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });

        return () => {
            socket.disconnect();
        };
    }, []);

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
                        <tr className="bg-white border-b">
                            <td className="px-6 py-4">Silver</td>
                            <td className="px-6 py-4">Silver</td>
                            <td className="px-6 py-4">Laptop</td>
                            <td className="px-6 py-4">
                                <button
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium 
                                    rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
                                >
                                    Start
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default IndexPage;
