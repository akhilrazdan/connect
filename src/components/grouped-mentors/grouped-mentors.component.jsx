import { useContext, Fragment } from 'react';

import { MentorsContext } from '../../contexts/mentors.context';
import MentorList from '../MentorList/mentor-list.component';

const GroupedMentors = () => {
  const { mentorsGroupedByIaf: mentorsMap } = useContext(MentorsContext);

  return (
    <Fragment>
      {Object.keys(mentorsMap).map((iaf_name) => {
        const mentors = mentorsMap[iaf_name];
        return (
          <MentorList key={iaf_name} iaf={iaf_name} mentors={mentors} />
        );
      })}
    </Fragment>
  );
};

export default GroupedMentors;
