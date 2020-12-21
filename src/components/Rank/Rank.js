import React from 'react';
import './Rank.css';

const Rank = ({ name, entries }) => {
  let noEmptyName = (name) ? name : 'Hello';
  let unknownEntries = (isNaN(entries)) ? 'unknown' : entries;
  return (
    <div className="rank ph4">
      <div className='white f3'>
        {`${noEmptyName}, your entry count is...`}
      </div>
      <div className='white f1'>
        {unknownEntries}
      </div>
    </div>
  );
}

export default Rank;