import React, { useState, useEffect, useContext } from 'react';
import MentorCard from '../mentor-card/mentor-card.component';
import { UserMetadataContext } from '../../contexts/user-metadata.context';

import './mentor-list.styles.scss';

const MentorList = ({ iaf, mentors }) => {
    const { userMetadata } = useContext(UserMetadataContext);
    console.log(`userMetadata in MentorList ${userMetadata}`)
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