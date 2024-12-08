import { Search } from 'lucide-react'
import React from 'react'
import {Input} from "@/components/ui/input"

type Props = {}
const SearchBar = (props: Props) => {
  return (
    <div className='border rounded-md px-3 flex items-center focus-visible:ring-ring focus-visible:ring-1'>
        <Input placeholder='Search' className='h-10 border-none focus-visible:ring-0 focus-visible:ring-transparent outline-none'/>
        <Search />
    </div>
  )
}

export default SearchBar