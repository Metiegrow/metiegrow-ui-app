import React from 'react'
import { NavLink } from 'reactstrap'

const MentorShip = () => {
  return (
    <div>
      <h1>Welcome to Mentorship page</h1>
      <NavLink href='/app/mentorship/about'>
        <h1>About</h1>
      </NavLink>
    </div>
  )
}

export default MentorShip
