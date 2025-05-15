import React from 'react'

const ButtonWithIcon = ({ title, icon, bgcolor, className = "", onClick, btnclass = "" }) => {
  return (
    <div onClick={onClick} className={`flex items-center cursor-pointer gap-2 p-2 rounded-md text-white justify-center ${bgcolor ? bgcolor : "bg-bg-color"} ${className} border`}>
      <button className={btnclass}>{title}</button>
      {icon && (<div className='p-1'>{icon}
      </div>)}
    </div>
  )
}

export default ButtonWithIcon