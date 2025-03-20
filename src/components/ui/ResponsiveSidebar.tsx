import React, { useEffect, useState } from 'react'
import { RiMenuFill } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { HiMenu } from 'react-icons/hi';

const ResponsiveSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    
  
    useEffect(() => {
      document.body.style.overflow = isOpen ? "hidden" : "";
    }, [isOpen]);
  
    const {pathname} = useLocation();
  
    useEffect(() => {
      if (isOpen) setIsOpen(false);
    }, [pathname]);
  return (
    <>
     <button onClick={()=>setIsOpen(true)} className="text-3xl text-primary block lg:hidden">
        <HiMenu />
      </button>

    <div
      onClick={() => setIsOpen(false)}
      className={`fixed  ${!isOpen ? "-left-[100%]" : "left-0"} h-full w-full top-0 dark:bg-dark-primary bg-white z-50  duration-200`}
    >
      <div onClick={(e) => e.stopPropagation()} className={`w-full  h-full p-2  `}>
       <Sidebar closeFn = {()=>setIsOpen(false)}/>
      </div>
    </div>
  </>
  )
}

export default ResponsiveSidebar