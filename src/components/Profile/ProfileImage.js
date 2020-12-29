import React from 'react';
import image from './shiba.png';

const ProfileImage = ({ src }) => {
  const imageSrc = (src) ? src : image;
  return (
    <img
      src={imageSrc}
      className="br-100 ba h3 w3 dib" alt="avatar" style={{borderColor: '#FFD15E'}} />
  )
}

export default ProfileImage