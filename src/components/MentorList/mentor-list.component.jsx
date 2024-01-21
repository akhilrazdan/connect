import React, { useState, useEffect, useContext } from 'react';
import { MentorsContext } from '../../contexts/mentors.context';
import MentorCard from '../mentor-card/mentor-card.component';
import './mentor-list.styles.scss';
import { UserMetadataContext } from '../../contexts/user-metadata.context';

const MentorList = () => {
    const { mentors } = useContext(MentorsContext);
    const { userMetadata } = useContext(UserMetadataContext);

    return (
        <div className="mentors-container">
            {userMetadata ? (
                mentors.map((mentor) =>
                    <MentorCard key={mentor.mentor_id} mentor={mentor} />)) :
                <div>
                    You're not registered with batonnage. Are you sure you are signing with the right email address?
                    Contact Priyanka French.
                </div>
            }
        </div>
    )
};

export default MentorList;