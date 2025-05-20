// socket.ts
import { io } from "socket.io-client";


export const socket = io(process.env.REACT_APP_BASE_URL!, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

