import React from "react";

type Props = {
  name: string | undefined;
  onClick : ( ) => void
};

const Avatar = ({ name, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`
            cursor-pointer
            flex 
            rounded-full 
            h-8
            w-8
            border
            items-center
            justify-center
            `}
    >
      {name?.toUpperCase()}
    </div>
  );
};

export default Avatar;
