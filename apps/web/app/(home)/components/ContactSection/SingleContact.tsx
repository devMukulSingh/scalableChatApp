import React from "react";
import Avatar from "../../../components/commons/Avatar";

type Props = {};

const SingleContact = (props: Props) => {
  return (
    <div className="cursor-pointer hover:bg-neutral-800  flex gap-3 px-3 py-2">
      <Avatar name="G" onClick={() => {}} />
      <div>
        <h1>Mukul singh bisht</h1>
        <h1>Recent Message</h1>
      </div>
        <h1 className="text-xs self-end ml-auto">
            12:12 am
        </h1>

    </div>
  );
};

export default SingleContact;
