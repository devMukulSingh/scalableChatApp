import { Input } from "@repo/ui/components/ui/input";
import { KeyboardEvent, useState } from "react";
import { useSocket } from "../../../../context/SocketProvider";
type Props = {};

const MessageInputBar = (props: Props) => {
  const onkeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleOnSend();
    }
  };
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");

  const handleOnSend = () => {
    const senderId = `1`;
    const receiverId = `2`;
    if (message.trim() !== "")
      sendMessage({ msg: message, senderId, receiverId });
    setMessage("");
  };
  return (
    <div className="w-full flex mt-auto gap-5">
      <Input
        className="border-white border-2  px-5 py-2 w-full"
        onKeyUp={onkeyUp}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
       
      />

      <button
        onClick={handleOnSend}
        className="bg-white px-4 py-2 text-black rounded-md"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInputBar;
