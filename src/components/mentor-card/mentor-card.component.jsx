import Button from '../button/button.component';
import { signupMenteeForMentor } from '../../utils/firebase/connect-api.utils';
import { useState, useContext } from 'react';
import { UserMetadataContext } from '../../contexts/user-metadata.context';
import { MentorsContext } from '../../contexts/mentors.context'
import './mentor-card.styles.scss'

const MentorCard = ({ mentor }) => {
    const { mentor_id, name, max_mentor_capacity, current_mentee_count, is_registered, image_url } = mentor;
    const [signupStatus, setSignupStatus] = useState('idle'); // 'idle', 'pending', 'success', 'error'
    const [errorMessage, setErrorMessage] = useState('');
    const { refreshMentors } = useContext(MentorsContext);

    const { userMetadata } = useContext(UserMetadataContext);
    const menteeUid = userMetadata.uid;
    console.log(`userMetadata in MentorCard ${JSON.stringify(userMetadata)}, ${menteeUid}`)

    const onMentorSignup = async ({ menteeUid, mentorId }) => {
        console.log(`menteeUid ${menteeUid} mentorId ${mentorId}`)
        setSignupStatus('pending');

        try {
            const result = await signupMenteeForMentor({ menteeId: menteeUid, mentorId }); // TODO-akhilz Correct this disaster
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
        <div className='image-container'>
            <img src={image_url} alt='mentor' />
            {is_registered && <div className='registered-overlay'>Registered</div>}
            {!is_registered && signupStatus === 'idle' && (
                <Button
                    buttonType='inverted'
                    onClick={() => onMentorSignup({ menteeUid, mentorId: mentor_id })}
                    className='signup-button'
                >
                    Sign Up
                </Button>
            )}
        </div>

        <div className='footer'>
            <span className='name'>{name}</span>
            {/* <Button buttonType='inverted' onClick={onMentorSignup}>Sign Up</Button> */}
            <span className='slots'>{max_mentor_capacity - current_mentee_count} left!</span>
            {/* {signupStatus === 'idle' && <Button buttonType='inverted' onClick={() => onMentorSignup({ menteeUid, mentorId: mentor_id })}>Sign Up</Button>} */}
            {/* {is_registered && <div className='registered-overlay'>Registered</div>} */}
            {/* {!is_registered && signupStatus === 'idle' && (
                <Button buttonType='inverted' onClick={() => onMentorSignup({ menteeUid, mentorId: mentor_id })}>
                    Sign Up
                </Button>
            )} */}
            {signupStatus === 'pending' && <p>Signing up...</p>}
            {signupStatus === 'success' && <p>Signed up successfully!</p>}
            {signupStatus === 'error' && <p>Error: {errorMessage}</p>}
        </div>
    </div >
    )
}

export default MentorCard;