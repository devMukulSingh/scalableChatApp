import React from 'react'
import { IMessage } from '../../../lib/types'
import { format } from "date-fns"
import { useAuth } from '@clerk/nextjs';

type Props = {
  messageObj: IMessage;
  messageType : 'sent' | 'received'
};

const SingleMessage = ({ messageObj,messageType }: Props) => {
  const { userId } = useAuth()
  console.log(messageObj)
  if(!messageType) return null
  return (
    <div
      style={messageType==='sent' ? {
        marginLeft:'auto' 
      } : {}}
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
      <h1 className="text-[10px] self-end ml-auto">
        {format(messageObj?.createdAt, "hh MM aa")}
      </h1>
    </div>
  );
};

export default SingleMessage