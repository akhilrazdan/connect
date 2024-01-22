import React, { useState, useEffect, useContext } from 'react';
import { MentorsContext } from '../../contexts/mentors.context';
import MentorCard from '../mentor-card/mentor-card.component';
import { UserMetadataContext } from '../../contexts/user-metadata.context';

import './mentor-list.styles.scss';

const MentorList = ({ iaf, mentors }) => {
    const { userMetadata } = useContext(UserMetadataContext);

    return (
        <div>
            <h2>
                <span className='title'>{iaf}</span>
            </h2>
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
        </div>

    )
};

export default MentorList;