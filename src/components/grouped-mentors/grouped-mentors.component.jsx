import { useContext, useEffect } from 'react';
import { MentorsContext } from '../../contexts/mentors.context';
import MentorList from '../MentorList/mentor-list.component';
import './grouped-mentors.styles.scss'

const GroupedMentors = () => {
  const { mentorsGroupedByIaf: mentorsMap, trackName, choicesRemaining } = useContext(MentorsContext);
  useEffect(() => {
    if (choicesRemaining === 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Add any additional effect triggers here if needed
    }
  }, [choicesRemaining]);

  console.log("In Grouped mentors")
  return (
    <div className='grouped-mentors'>
      <div className="mentee-track-info">
        <div className="track-details">
          <h2>Preferred Track</h2>
          <p>{trackName}</p>
        </div>
        <div className={`choices-remaining  ${choicesRemaining === 0 ? 'highlight' : ''}`}>
          <h2>Choices Remaining</h2>
          <p>{choicesRemaining}</p>
        </div>
      </div>

      {
        Object.keys(mentorsMap).map((iaf_name) => {
          const mentors = mentorsMap[iaf_name];
          return (
            <MentorList key={iaf_name} iaf={iaf_name} mentors={mentors} />
          );
        })
      }
    </div >
  );
};

export default GroupedMentors;
