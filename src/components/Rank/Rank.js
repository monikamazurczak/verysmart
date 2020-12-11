import React from 'react';

const Rank = ({ name, entries }) => {
  let noEmptyName = (name) ? name : 'Hello';
  let unknownEntries = (isNaN(entries)) ? 'unknown' : entries;
  return (
    <div>
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