import React from 'react'
import NavLinks from './NavLinks'
import { UserButton } from '@clerk/nextjs'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className="w-screen bg-sky-600 h-20 flex items-center  px-10 py-3">
        <NavLinks/>
        <div className='ml-auto'>
        <UserButton/>
        </div>
    </div>
  )
}

export default Navbar