import React, { useState, useEffect, useContext } from 'react';
import { MentorsContext } from '../../contexts/mentors.context';
import MentorCard from '../mentor-card/mentor-card.component';
import './mentor-list.styles.scss';

const MentorList = () => {
    const { mentors } = useContext(MentorsContext);

    return (
        <div className="mentors-container">
            {mentors.map((mentor) =>
                <MentorCard key={mentors.id} mentor={mentor} />
            )}
        </div>
    )
};

export default MentorList;