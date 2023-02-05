import React from 'react';

const Card = ({ name, email, id, onMentorSignup }) => {
  return (
    <div className='tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5'>
      <img alt='robots' src={`https://robohash.org/${id}?size=200x200`} />
      <div>
        <h2>{name}</h2>
        <p>{email}</p>
        <button onClick={onMentorSignup}>Sign up</button>
      </div>
    </div>
  );
}

export default Card;
