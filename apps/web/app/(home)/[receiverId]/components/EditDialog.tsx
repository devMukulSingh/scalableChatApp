import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditMessageForm from "./EditMessageForm";
import { IMessage } from "@/app/lib/types";

type Props = {
  isOpenEditDialog: boolean;
  setIsOpenEditDialog: (open: boolean) => void;
  messageObj: IMessage;
};

export default function EditDialog({
  isOpenEditDialog,
  setIsOpenEditDialog,
  messageObj,
}: Props) {
  return (
    <Dialog open={isOpenEditDialog} onOpenChange={setIsOpenEditDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Message</DialogTitle>
        </DialogHeader>
        <EditMessageForm
          messageObj={messageObj}
          setIsOpenEditDialog={setIsOpenEditDialog}
        />
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
