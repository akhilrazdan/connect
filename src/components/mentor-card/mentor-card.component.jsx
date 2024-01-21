import Button from '../button/button.component';
import { signupMenteeForMentor } from '../../utils/firebase/connect-api.utils';
import { useState, useContext } from 'react';
import { UserMetadataContext } from '../../contexts/user-metadata.context';
import { MentorsContext } from '../../contexts/mentors.context'
import './mentor-card.styles.scss'

const MentorCard = ({ mentor }) => {
    const { mentorId, name, max_mentor_capacity, current_mentee_count, image_url } = mentor;
    const [signupStatus, setSignupStatus] = useState('idle'); // 'idle', 'pending', 'success', 'error'
    const [errorMessage, setErrorMessage] = useState('');
    const { refreshMentors } = useContext(MentorsContext);

    const { userMetadata } = useContext(UserMetadataContext);
    const menteeUid = userMetadata.uid;

    const onMentorSignup = async () => {

        setSignupStatus('pending');

        try {
            await signupMenteeForMentor(menteeUid, mentorId);
            console.log(result); // Handle result if needed
            setSignupStatus('success');

            // Trigger a refresh of all mentors
            refreshMentors();
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message || 'Failed to sign up.');
            setSignupStatus('error');
        }
    }
    console.log(`max_mentor_capacity ${max_mentor_capacity} current_mentee_count ${current_mentee_count}`)

    return (< div className='mentor-card-container' >
        <img src={image_url} alt='mentor' />
        <div className='footer'>
            <span className='name'>{name}</span>
            {/* <Button buttonType='inverted' onClick={onMentorSignup}>Sign Up</Button> */}
            <span className='slots'>{max_mentor_capacity - current_mentee_count} left!</span>
            {signupStatus === 'idle' && <Button buttonType='inverted' onClick={onMentorSignup}>Sign Up</Button>}
            {signupStatus === 'pending' && <p>Signing up...</p>}
            {signupStatus === 'success' && <p>Signed up successfully!</p>}
            {signupStatus === 'error' && <p>Error: {errorMessage}</p>}
        </div>
    </div >
    )
}

export default MentorCard;