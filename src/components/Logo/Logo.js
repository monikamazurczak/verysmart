import React, { useState } from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
  const [isShown, setIsShown] = useState(false);

  const tooltipStyle = {
    opacity: (isShown) ? 1 : 0,
  };

  return (
    <div 
      className='logo ma4 mt0' 
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner pa3">
          <img style={{paddingTop: '5px'}} alt='logo' src={brain}/>
        </div>
        <div className="logo-tooltip" style={tooltipStyle}>so smart</div>
      </Tilt>
    </div>
  );
}

export default Logo;