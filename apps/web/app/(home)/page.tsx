"use client";
import {  KeyboardEvent, useState } from "react";
import { useSocket } from "../../context/SocketProvider";

const page = () => {
  const { sendMessage,messages } = useSocket()
  const [message, setMessage] = useState("");
  const onkeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key==='Enter'){
      handleOnSend();
    }
  };
  const handleOnSend = () => {
    const senderId = `1`;
    const receiverId = `2`;
    if(message.trim()!=='')
      sendMessage({msg:message,senderId,receiverId});
      setMessage("");
  }
  return (
    <div className="w-full h-screen flex flex-col items-center p-5 gap-5 ">
      <div className="flex gap-5">
        <input
          onKeyUp={onkeyUp}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="border-white border-2  px-5 py-2"
        />

        <button
          onClick={ handleOnSend}
          className="bg-white px-4 py-2 text-black rounded-md"
        >
          Send
        </button>
      </div>
      <div className="flex flex-col gap-5 border p-5 min-h-[10rem] w-[20rem]">
        <h1 className="text-center">Messages</h1>
        {messages.map((message, index) => (
          <h1 key={index}>{message.msg}</h1>
        ))}
      </div>
    </div>
  );
};

export default page;
