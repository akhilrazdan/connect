import React from 'react';

const maxSignups = 6;
const Rank = ({ name, signupsTotal, choicesRemaining }) => {
  return (
    <div>
      <div className='white f2'>
        {`Hello ${name},`} </div>
      <p></p>
      <div className='pa2 mh2 white f5'> Please click on Sign Up to request mentorship. Membership will be granted on a first come first serve basis. Please be very sure before you click on Sign up! There's no way to undo registrations from this website. Please get in touch with priya@gmail.com to make alterations</div>

      <p></p>
      <div className='white f3'>
        Choices Remaining: {choicesRemaining} Total Signups: {signupsTotal}
      </div>
    </div>
  );
}

export default Rank;