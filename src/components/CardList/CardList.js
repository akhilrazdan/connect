import React from 'react';
import Card from '../Card/Card';

const CardList = ({ robots, onMentorSignup }) => {
  return (
    <div>
      {
        robots.map((user, i) => {
          return (
            <Card
              key={i}
              id={robots[i].id}
              name={robots[i].name}
              email={robots[i].email}
              onMentorSignup={onMentorSignup}
              />
          );
        })
      }
    </div>
  );
}

export default CardList;