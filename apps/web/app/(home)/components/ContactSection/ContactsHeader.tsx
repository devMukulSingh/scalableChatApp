'use client'
import React from 'react'
import Avatar from '../../../components/commons/Avatar'
import SearchBar from './SearchBar'
import {  useUser } from '@clerk/nextjs'

type Props = {}

const ContactsHeader = (props: Props) => {
  const {  user } = useUser()
    function handleClick(){

    }
  return (
    <div className="sticky px-3 py-5 top-0 bg-neutral-800 flex flex-col gap-5">
      <div className="flex items-center gap-5">
        <Avatar onClick={handleClick} name="M" />
        {user?.fullName}
      </div>

      <SearchBar />
    </div>
  );
}

export default ContactsHeader