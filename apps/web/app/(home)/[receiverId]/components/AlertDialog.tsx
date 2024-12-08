import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditMessageForm from "./EditMessageForm";
import { useMutation } from "@tanstack/react-query";
import { base_url_server } from "@/app/lib/base_url";
import axios from "axios";

type Props = {
  isOpenAlertDialog: boolean;
  setIsOpenAlertDialog: (open: boolean) => void;
  onConfirm: () => void;
};

const AlertDialog = ({
  isOpenAlertDialog,
  onConfirm,
  setIsOpenAlertDialog,
}: Props) => {

  return (
    <Dialog open={isOpenAlertDialog} onOpenChange={setIsOpenAlertDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Message</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setIsOpenAlertDialog(false)} type="button">Cancel</Button>
          <Button variant={"destructive"} onClick={onConfirm} type="button">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialog;
