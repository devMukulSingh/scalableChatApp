"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { KeyboardEvent, useEffect, useState } from "react";
import { useSocket } from "../../../../context/SocketProvider";
import { useParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
type Props = {};

const MessageInputBar = (props: Props) => {
  const messagesPage = document.getElementById("messagesPage");
  const { sendMessage, messages } = useSocket();

  const { receiverId } = useParams();
  const { userId: senderId } = useAuth();
  const onkeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleOnSend();
    }
  };

  const [message, setMessage] = useState("");

  const handleOnSend = () => {
    if (!receiverId || !senderId) {
      throw new Error("receiverId or senderId is undefined");
    }
    sendMessage({
      message,
      senderId,
      receiverId: receiverId.toString(),
      createdAt: new Date().toString(),
      id: "",
    });

    setMessage("");
  };
  useEffect(() => {
    if (messagesPage)
      messagesPage.scrollTo({
        behavior: "smooth",
        top: messagesPage?.scrollHeight,
      });
  }, [messages]);
  return (
    <div className="w-full flex mt-auto gap-5">
      <Input
        autoFocus
        className="border-white border-2  px-5 py-2 w-full"
        onKeyUp={onkeyUp}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
      />

      <Button
        disabled={message.trim() === ""}
        onClick={handleOnSend}
        className="bg-white px-4 py-2 text-black rounded-md"
      >
        Send
      </Button>
    </div>
  );
};

export default MessageInputBar;
