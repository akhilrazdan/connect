import React from 'react';

const maxSignups = 6;
const Rank = ({ name, signupsTotal }) => {
  return (
    <div>
      <div className='white f3'>
        {`${name}, your current remaining choices are...`}
      </div>
      <div className='white f1'>
        {maxSignups - signupsTotal}
      </div>
    </div>
  );
}

export default Rank;