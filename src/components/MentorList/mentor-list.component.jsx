import MentorCard from '../mentor-card/mentor-card.component';

import './mentor-list.styles.scss';

const MentorList = ({ iaf, mentors }) => {
    return (
        <div>
            <h2>
                <span className='title'>{iaf}</span>
            </h2>
            <div className="mentors-container">
                {mentors.map((mentor) =>
                    <MentorCard key={mentor.mentor_id} mentor={mentor} />
                )}
            </div>
        </div>

    )
};

export default MentorList;