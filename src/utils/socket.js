// utils/socket.js
import { io } from "socket.io-client";

export const initSocket = () => {
  const socket = io(`${process.env.NEXT_PUBLIC_SOCKETIO_URL}`, {
    transports: ["websocket"], // force websocket
  });

  socket.on("connect", () => console.log("Socket connected:", socket.id));
  socket.on("disconnect", () => console.log("Socket disconnected"));
  socket.on("connect_error", (err) => console.log("Socket connect error:", err));
  socket.on("joined", (room) => console.log("Joined room:", room));
  socket.on("pong", () => console.log("Pong received!"));

  return socket;
};
