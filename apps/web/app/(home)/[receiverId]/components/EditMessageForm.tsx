"use client";
import { editMessageSchema } from "../../../lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { base_url_server } from "../../../lib/base_url";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { IMessage } from "@/app/lib/types";
import { Button } from "@/components/ui/button";

type Props = {
  messageObj: IMessage;
  setIsOpenEditDialog: (open:boolean) => void
};

type formValues = z.infer<typeof editMessageSchema>;


const EditMessageForm = ({ messageObj,setIsOpenEditDialog  }: Props) => {
  const { userId } = useAuth();
  const { receiverId } = useParams();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["editMessage"],
    mutationFn: async (data: formValues ) => {
      await axios.put(`${base_url_server}/chat/edit-message`, {
        message: data.message,
        id:messageObj.id
        // id: messageObj.id,
      });
    },
    onSuccess: () => {
      console.log(userId,receiverId)
      queryClient.invalidateQueries({
        queryKey: [`sender-${userId}receiver-${receiverId}`],
        exact: true,
      });
      toast.success(`Message edited`);
      setIsOpenEditDialog(false)
    },
  });
  const form = useForm<formValues>({
    resolver: zodResolver(editMessageSchema),
    defaultValues: {
      message:messageObj.message,
    },
  });
  function onSubmit(data: formValues) {
    mutate(data);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="message"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save changes</Button>
      </form>
    </Form>
  );
};

export default EditMessageForm;
