import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit, disabled }) => {
  return (
    <div>
      <p className='f3'>
        {'Magic Brain is very smart and will detect faces. Git it a try.'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input className='f4 pa2 w-70 center' type='tex' placeholder='Paste Image URL..' onChange={onInputChange}/>
          <button
            className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
            onClick={onButtonSubmit}
            disabled={disabled}
          >Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;