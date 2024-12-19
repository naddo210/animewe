import React from 'react'

const Button = ({title,rightIcon,id,leftIcon,containerClass}) => {
  return (
   <button id={id} className={`group relative cursor-pointer z-10 overflow-hidden rounded-full bg-voilet-50 px-7 py-3 w-fit text-black ${containerClass}`}>{leftIcon}
   <span className='relative inline-flex overflow-hidden font-general text-xs uppercase'>
    <div>
        {title}
    </div>
   </span>
   {rightIcon}
   </button>
  )
}

export default Button