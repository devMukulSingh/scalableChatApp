import React from 'react'
import ContactsHeader from './ContactsHeader'
import ContactsList from './ContactsList'

type Props = {}

const ContactsSidebar = (props: Props) => {
  return (
    <div className='h-[calc(100vh-5rem)] overflow-auto min-w-[28rem]  flex flex-col gap-5'>
      <ContactsHeader/>
      <ContactsList/>
    </div>
  )
}

export default ContactsSidebar