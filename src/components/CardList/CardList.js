import React from 'react';
import Card from '../Card/Card';

const CardList = ({ mentors, onMentorSignup }) => {
  return (
    <div>
      {
        mentors.map((user, i) => {
          return (
            <Card
              key={i}
              id={mentors[i].id}
              name={mentors[i].name}
              email={mentors[i].email}
              onMentorSignup={onMentorSignup}
              />
          );
        })
      }
    </div>
  );
}

export default CardList;