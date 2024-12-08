import React, { useState } from "react";
import { IMessage } from "../../../lib/types";
import { format } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
const MessageOptionsDropdown = dynamic(
  () => import("./MessageOptionsDropdown"),{
    ssr:false
  }
);

type Props = {
  messageObj: IMessage;
  messageType: "sent" | "received";
};

const SingleMessage = ({ messageObj, messageType }: Props) => {
  const { userId } = useAuth();
  if (!messageType) return null;
  return (
    <>
      <div
        style={
          messageType === "sent"
            ? {
                marginLeft: "auto",
              }
            : {}
        }
        className={`
    max-w-[25rem]
    w-1/2
    border 
    flex px-2 py-2 
    gap-5 
    rounded-md
    
    `}
      >
        <h1 className="break-words">{messageObj.message}</h1>
        <div className=" ml-auto flex flex-col ">
          <h1 className="text-[10px]  ">
            {format(messageObj?.createdAt, "hh MM aa")}
          </h1>
          <MessageOptionsDropdown messageObj={messageObj}>
            <ChevronDown className="ml-auto cursor-pointer" />
          </MessageOptionsDropdown>
        </div>
      </div>
    </>
  );
};

export default SingleMessage;
