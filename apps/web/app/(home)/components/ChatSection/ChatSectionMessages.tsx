import { useSocket } from "../../../../context/SocketProvider";
import SingleMessage from "./SingleMessage";


type Props = {}

const ChatSectionMessages = (props: Props) => {
      const { sendMessage, messages } = useSocket();
  return (
    <div className="flex flex-col gap-5 border p-5 min-h-[10rem] h-full w-full">
      <h1 className="text-center">Messages</h1>
      {messages.map((message, index) => (
        <SingleMessage/>
      ))}
    </div>
  );
}

export default ChatSectionMessages