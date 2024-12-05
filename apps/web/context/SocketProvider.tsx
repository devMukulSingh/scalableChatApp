"use client";
import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { ISocketMessage } from "../app/lib/types";
import { auth } from "@clerk/nextjs/server";
import { useAuth } from "@clerk/nextjs";

interface IContext {
  sendMessage: ({ msg, senderId, receiverId }: ISocketMessage) => void;
  messages: ISocketMessage[];
}

const SocketContext = React.createContext<IContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error("state is undefined");
  return state;
};
export default function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<ISocketMessage[]>([]);

  const sendMessage = useCallback(
    (message:ISocketMessage) => {
      console.log("send message", message);
      if (socket) {
        socket.emit("event:message", message);
      }
    },
    [socket]
  );

  const onMessageReceived = useCallback((message:string) => {
    console.log("message received", message);
    const parsedMsg = JSON.parse(message);
    console.log(parsedMsg, "message");
    setMessages((prev) => [...prev, parsedMsg]);
  }, []);
  const { userId } = useAuth()
  useEffect(() => {
    if (userId){

      const _socket = io(`http://localhost:8000`);
      _socket.on("event:message", onMessageReceived);
      setSocket(_socket);
      return () => {
        _socket.off("event:message", onMessageReceived);
        _socket.disconnect();
        setSocket(undefined);
      };
    }
  },[]);

  return (
    <SocketContext.Provider value={{ sendMessage, messages }}>
      {children}
    </SocketContext.Provider>
  );
}
