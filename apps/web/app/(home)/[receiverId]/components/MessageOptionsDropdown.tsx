import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactNode, useState } from "react";
import { IMessage } from "../../../lib/types";
import toast from "react-hot-toast";
import EditDialog from "./EditDialog";
import AlertDialog from "./AlertDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { base_url_server } from "@/app/lib/base_url";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useAuth } from "@clerk/clerk-react";

type Props = {
  messageObj: IMessage;
  children: ReactNode;
};

export default function MessageOptionsDropdown({
  children,
  messageObj,
}: Props) {
  const { receiverId } = useParams()
  const { userId } = useAuth()
  const queryClient = useQueryClient();
  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);
  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState(false);
  const { mutate } = useMutation({
    mutationKey: ["deleteMessage"],
    mutationFn: async () => {
      await axios.delete(`${base_url_server}/chat/delete-message`, {
        data: {
          messageId: messageObj.id,
        },
      });
    },
    onSuccess :  () => {
      queryClient.invalidateQueries({
        queryKey: [`sender-${userId}receiver-${receiverId}`],
      });
      toast.success(`Message deleted`)
    }
  });
  const dropdownMenuOptions = [
    {
      name: "Edit",
      onSelect: onEditMessage,
    },
    {
      name: "Delete",
      onSelect: () => setIsOpenAlertDialog(true),
    },
    {
      name: "Copy",
      onSelect: onCopyMessage,
    },
  ];
  function onEditMessage() {
    setIsOpenEditDialog(true);
  }
  function onCopyMessage() {
    navigator.clipboard.writeText(messageObj.message);
    toast.success("Message copied");
  }
  function onConfirm() {
    mutate();
    setIsOpenAlertDialog(false);
  }
  return (
    <>
      <AlertDialog
        isOpenAlertDialog={isOpenAlertDialog}
        setIsOpenAlertDialog={setIsOpenAlertDialog}
        onConfirm={onConfirm}
      />
      <EditDialog
        messageObj={messageObj}
        isOpenEditDialog={isOpenEditDialog}
        setIsOpenEditDialog={setIsOpenEditDialog}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white text-black ">
          <DropdownMenuGroup>
            {dropdownMenuOptions.map((options, index) => (
              <DropdownMenuItem
                className="cursor-pointer"
                key={index}
                onClick={options.onSelect}
              >
                {options.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
