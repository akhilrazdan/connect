import { useContext, Fragment } from 'react';

import { MentorsContext } from '../../contexts/mentors.context';
import MentorList from '../MentorList/mentor-list.component';
import './grouped-mentors.styles.scss'

const GroupedMentors = () => {
  const { mentorsGroupedByIaf: mentorsMap } = useContext(MentorsContext);
  console.log("In Grouped mentors")
  return (
    <div className='grouped-mentors'>
      {Object.keys(mentorsMap).map((iaf_name) => {
        const mentors = mentorsMap[iaf_name];
        return (
          <MentorList key={iaf_name} iaf={iaf_name} mentors={mentors} />
        );
      })}
    </div>
  );
};

export default GroupedMentors;
