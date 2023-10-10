import React from 'react'

const SidebarItem = (props) => {
  return (
    <div class={'group flex items-center space-x-3 my-5 cursor-pointere hover:border-l-4 hover:border-l-discordBlue active:border-l-discordBlue active:border-l-4 md:hover:border-discordBlue md:hover:bg-discordBlue md:active:bg-gray-300 md:hover:opacity-70 text-discordBlue hover:bg-gray-100 md:hover:text-white p-3 ' + props.leftBorder} onClick={props.onClick}>
      {/* image */}
      <div class='text-discordBlue md:group-hover:text-white'>
        {props.muiIcon}
      </div>
      {/* text */}
      <h2 class={`${props.textSize}`}>{props.itemText}</h2>
    </div>
  )
}

export default SidebarItem
