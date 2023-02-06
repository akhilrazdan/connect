import React from 'react';
import './Card.css'

const Card = ({ name, email, area, id, availableSlots, onMentorSignup, isRegistered }) => {
  if (isRegistered) {
    return (
      <div className='tc grow bg-washed-green br3 pa3 ma2 dib bw2 shadow-5'>
        <div className='container'>
          <h2>{name}</h2>
          <p>{area}</p>
          <button className="b ph3 pv3 input-reset ba b--black  grow pointer f6 dib" disabled={true}>Sign up</button>
          <span className='stamp is-approved block'> Registered </span>
        </div>
      </div>
    );
  }
  if (availableSlots > 0) {
    return (
      <div className='tc grow bg-washed-green br3 pa3 ma2 dib bw2 shadow-5'>

        <div>
          <h2>{name}</h2>
          <p>{area}</p>
          <button className="b ph3 pv3 input-reset ba b--black  grow pointer f6 dib"
            onClick={() => onMentorSignup({ name, email, id })}>Sign up</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className='tc grow bg-light-gray br3 pa3 ma2 dib bw2 shadow-5 dim'>
        <div className='container'>
          <h2>{name}</h2>
          <p>{area}</p>
          <button className="b ph3 pv3 input-reset ba b--black  grow pointer f6 dib" disabled={true}>Sign up</button>
          <span className='stamp is-nope block'> Class Full </span>
        </div>
      </div>
    );
  }

}

export default Card;
