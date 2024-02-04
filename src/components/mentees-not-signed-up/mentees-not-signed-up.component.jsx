import React from 'react';
import './mentees-not-signed-up.styles.scss'; // Import SCSS styles

const MenteesNotSignedUp = ({ mentees }) => {
    return (
        <div className="mentees-list">
            <h2 className="title">Mentees Not Signed Up</h2>
            <ul>
                {mentees.map((mentee, index) => (
                    <li key={index} className="mentee-item">
                        <span className="name">{mentee.name}</span>
                        <span className="email">{mentee.email}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenteesNotSignedUp;