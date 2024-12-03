'use client'
import React from 'react'
import Avatar from '../../../components/commons/Avatar'
import SearchBar from './SearchBar'

type Props = {}

const ContactsHeader = (props: Props) => {
    function handleClick(){

    }
  return (
    <div className='sticky px-3 py-5 top-0 bg-neutral-800 flex flex-col gap-5'>
      <Avatar onClick={handleClick} name="M" />
      <SearchBar/>
    </div>
  );
}

export default ContactsHeader