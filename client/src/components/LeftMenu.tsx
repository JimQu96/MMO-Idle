import React from 'react'

const LeftMenu: React.FC = () => {
  return (
    <div className="w-64 top-(--navbar-height) left-0 bottom-0 absolute">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <ul>
        <li className="mb-2">Home</li>
        <li className="mb-2">About</li>
        <li className="mb-2">Contact</li>
      </ul>
    </div>
  )
}

export default LeftMenu 