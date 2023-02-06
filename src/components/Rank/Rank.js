import React from 'react';

const maxSignups = 6;
const Rank = ({ name, signupsTotal, choicesRemaining }) => {
  return (
    <div>
      <div className='black f2'>
        {`Welcome ${name}`} </div>
      <p></p>
      <div className='pa2 mh2 black f5'>
        Please find below your form to fill your mentor selections. Please note that you are able to pick a minimum of 1 and a maximum of 6 mentors. This selection process is on a first come, first serve basis.
        <p>
        NOTE: Each mentor has a maximum capacity of 6 mentees. If you cannot find your mentor's name on the list, chances are that their roster has been filled. If you are interested in reaching out, send us an email at mentorship@batonnageforum.com and we will see what we can do to best accommodate.
        </p>
        <p>DEADLINE: Thursday, February 9th 2023.</p>
        <p>
        Next Steps: IAF heads will start communicating with mentors starting in week of Feb 13th. You will receive an email confirming the mentors that you have been assigned to during the week of Feb 13th as well.
        ***In case of any questions, feel free to reach out to us at mentorship@batonnageforum.com. Your IAF heads are also available to answer any questions as you make theses decisions as well.
        </p>
        
      </div>

      <p></p>
      <div className='black f3'>
        Choices Remaining: {choicesRemaining} Total Signups: {signupsTotal}
      </div>
    </div>
  );
}

export default Rank;