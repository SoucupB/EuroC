import React from 'react'
import './css/Navbar.css';

const className = 'navbar'
const titleClass = 'title-text'

export default function Navbar({title}) {
  return (
    <div className = {className} >
      <div className = {titleClass}>
        {title}
      </div>
    </div>
  )
}
