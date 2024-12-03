
'use client'
import SingleContact from './SingleContact'

type Props = {}

const ContactsList = (props: Props) => {
  return (
    <div className="flex flex-col gap-5">
      <SingleContact />
      <SingleContact />
      <SingleContact />
      <SingleContact />
      <SingleContact />
      <SingleContact />
      <SingleContact />
      <SingleContact />
      <SingleContact />
      <SingleContact />
    </div>
  );
}

export default ContactsList