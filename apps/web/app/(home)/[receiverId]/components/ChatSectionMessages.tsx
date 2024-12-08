"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSocket } from "../../../../context/SocketProvider";
import SingleMessage from "./SingleMessage";
import { useParams } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import { base_url_server } from "../../../lib/base_url";
import { useAuth } from "@clerk/nextjs";
import { IMessage } from "../../../lib/types";
import { useRef } from "react";

type Props = {};

const ChatSectionMessages = (props: Props) => {

  const messagesPageRef = useRef<HTMLDivElement | null>(null);
  const { messages, setMessages } = useSocket();
  const { userId } = useAuth();
  const { receiverId } = useParams();
  const { data } = useQuery<IMessage[]>({
    queryKey: [`sender-${userId}receiver-${receiverId}`],
    queryFn: async () => {
      const data = await axios.get(`${base_url_server}/chat/get-messages`, {
        params: {
          senderId: userId,
          receiverId,
        },
      });
      setMessages(data.data);

      return data.data;
    },
  });

  return (  
    <div
      id="messagesPage"
      ref={messagesPageRef}
      className="flex flex-col gap-5 border-2 p-5 min-h-[10rem] max-h-[calc(100vh-12rem)] h-full w-full overflow-auto"
    >
      {messages.length === 0 ? (
        <h1 className="text-center">No messages found</h1>
      ) : (
        messages?.map((messageObj, index) => {
          if (userId)
            return (
              <SingleMessage
                messageType={
                  userId === messageObj.senderId ? "sent" : "received"
                }
                messageObj={messageObj}
                key={index}
              />
            );
        })
      )}
    </div>
  );
};

export default ChatSectionMessages;
