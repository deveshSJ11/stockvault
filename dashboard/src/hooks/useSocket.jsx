import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

let socket; // Singleton socket

export const useSocket = () => {
  const [status, setStatus] = useState("connecting"); // connecting | connected | disconnected | error
  const [error, setError] = useState(null);

  const socketRef = useRef();

  useEffect(() => {
    if (!socket) {
      const backendUrl = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_BASE;
      if (!backendUrl) {
        console.error("❌ Backend URL not found in environment variables");
        setStatus("error");
        setError("Backend URL not configured");
        return;
      }

      socket = io(backendUrl, {
        path: "/socket.io",
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: 5,
        timeout: 20000,
      });
    }

    socketRef.current = socket;

    const handleConnect = () => setStatus("connected");
    const handleDisconnect = () => setStatus("disconnected");
    const handleError = (err) => {
      console.error("Socket error:", err);
      setStatus("error");
      setError(err.message || "Unknown socket error");
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleError);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleError);
    };
  }, []);

  return { socket: socketRef.current, status, error };
};
