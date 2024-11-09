/* eslint-disable react/prop-types */

import { ArrowDownToLine, SquareCode} from 'lucide-react';
import { Link } from 'react-router-dom'
const EditorNavbar = ({projectID}) => {
  return (
    <div className="EditorNavbar flex items-center justify-between px-[10px] md:px-[100px] h-[80px] bg-[#141414]">
      <Link to={'/'}>
      <h1 className="md:text-4xl text-2xl inline-flex items-center gap-2"><SquareCode size={32}/><span>code<span className="text-blue-600">web</span></span></h1>
      </Link>
      <p>File / <span className='text-gray-500'>{projectID}</span></p>
      <p className='rounded-full hover:bg-gray-600 hover:text-white p-2 cursor-pointer'><ArrowDownToLine size={32}/></p>
    </div>
  )
}

export default EditorNavbar