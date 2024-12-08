"use client";
import { useQuery } from "@tanstack/react-query";
import SingleContact from "./SingleContact";
import { base_url_server } from "../../../lib/base_url";
import axios, { AxiosResponse } from "axios";
import { IUser } from "../../../lib/types";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

type Props = {};

const ContactsList = (props: Props) => {
  const { userId } = useAuth()
  const { data } = useQuery<IUser[]>({
    queryKey: [userId],
    queryFn: async () => {
      const data = await axios.get(`${base_url_server}/auth/get-all-users`);
      return data.data;
    },
  });
  return (
    <div className="flex flex-col gap-5">
      {data?.map((user, index) => (
        <Link key={index} href={`/${user.id}`}>
          <SingleContact user={user} key={index} />
        </Link>
      ))}
    </div>
  );
};

export default ContactsList;
