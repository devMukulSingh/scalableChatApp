import React from "react";
import Avatar from "../../../components/commons/Avatar";
import { IUser } from "../../../lib/types";
import { useParams } from "next/navigation";

type Props = {
  user:IUser
};

const SingleContact = ({user}: Props) => {
  const { receiverId } = useParams()
  return (
    <div
      className={`
    cursor-pointer 
    hover:bg-neutral-800  
    flex gap-3 px-3 py-2
    ${receiverId === user.id ? `bg-neutral-900` : ""}
    `}
    >
      <Avatar name={user.name.at(0)} onClick={() => {}} />
      <div>
        <h1>{user.name}</h1>
        <h1>Recent Message</h1>
      </div>
      <h1 className="text-xs self-end ml-auto">12:12 am</h1>
    </div>
  );
};

export default SingleContact;
