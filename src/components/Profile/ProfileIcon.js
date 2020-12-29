import React, {useState} from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ProfileImage from './ProfileImage';
import './Profile.css';

const ProfileIcon = ({ onRouteChange, toggleModal }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => {
    setDropdownOpen(prevIsOpen => !prevIsOpen)
  }

  return (
    <div className="pa4 tc">
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle
          tag="span"
          data-toggle="dropdown"
          aria-expanded={dropdownOpen}>
          <ProfileImage />
        </DropdownToggle>
        <DropdownMenu right
          className="b--transparent shadow-5">
          <DropdownItem onClick={toggleModal}>View Profile</DropdownItem>
          <DropdownItem onClick={() => onRouteChange('signout')}>Sign Out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default ProfileIcon;