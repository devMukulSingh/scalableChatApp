"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { IMessage } from "../app/lib/types";
import { useAuth } from "@clerk/nextjs";

interface IContext {
  sendMessage: ({ message, senderId, receiverId,createdAt }: IMessage) => void;
  messages: IMessage[];
  setMessages: (message: IMessage[]) => void;
}

const SocketContext = React.createContext<IContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error("state is undefined");
  return state;
};
export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = useAuth();
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<IMessage[]>([]);

  //sending message, emitting event:message event
  const sendMessage = useCallback(
    (messageObj: IMessage) => {
      console.log("send message", messageObj);
      if (socket) {
        setMessages((prev) => [...prev, messageObj]);
        socket.emit("event:message", messageObj);
      }
    },
    [socket]
  );

  //receiving message
  const onMessageReceived = useCallback((message: string) => {
    console.log("message received", message);
    const parsedMsg = JSON.parse(message);
    console.log(parsedMsg, "message");
    setMessages((prev) => [...prev, parsedMsg]); 
  }, []);

  useEffect(() => {
    if (userId) {
      const _socket = io(`http://localhost:8000`, {
        query: {
          userId,
        },
      });
      _socket.on("connect", () => {
        console.log("socket connected to client");
      });
      _socket.on("event:message", onMessageReceived);
      setSocket(_socket);
      return () => {
        _socket.off("event:message", onMessageReceived);
        _socket.disconnect();
        setSocket(undefined);
      };
    }
  }, [userId]);
  return (
    <SocketContext.Provider value={{ sendMessage, messages, setMessages }}>
      {children}
    </SocketContext.Provider>
  );
}
