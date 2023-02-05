import React from 'react';
import './Card.css'

const Card = ({ name, email, id, onMentorSignup }) => {
  return (
    <div className='container tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5'>
        <img alt='robots' src={`https://robohash.org/${id}?size=200x200`} />
        <span className='stamp is-nope block'> Class Full </span>

      <div>
        <h2>{name}</h2>
        <p>{email}</p>
        <button className="b ph3 pv3 input-reset ba b--black  grow pointer f6 dib"
          onClick={() => onMentorSignup({ name, email, id })}>Sign up</button>
      </div>
    </div>
  );
}

export default Card;
