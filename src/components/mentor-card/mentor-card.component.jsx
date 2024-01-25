import Button from '../button/button.component';
import { signupMenteeForMentor } from '../../utils/firebase/connect-api.utils';
import { useState, useContext } from 'react';
import { UserMetadataContext } from '../../contexts/user-metadata.context';
import { MentorsContext } from '../../contexts/mentors.context'
import Modal from '../modal/modal.component';
import './mentor-card.styles.scss'
import { UserContext } from '../../contexts/user.context';
import { getIdTokenResult } from '../../utils/firebase/firebase.utils';

const MentorCard = ({ mentor }) => {
    const { mentor_id, name, max_mentor_capacity, current_mentee_count, is_registered, image_url, description } = mentor;
    const [signupStatus, setSignupStatus] = useState('idle'); // 'idle', 'pending', 'success', 'error'
    const [errorMessage, setErrorMessage] = useState('');
    const { refreshMentors, choicesRemaining } = useContext(MentorsContext);
    const [isBioVisible, setBioVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedMentor, setSelectedMentor] = useState({});

    const handleBioLinkClick = (event) => {
        event.preventDefault(); // Prevent the default anchor link behavior
        setBioVisible(!isBioVisible); // Toggle the visibility of the bio
    };

    const openModal = (mentor) => {
        setSelectedMentor(mentor);
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };


    const { userMetadata } = useContext(UserMetadataContext);
    const { currentUser } = useContext(UserContext);
    const menteeUid = userMetadata.uid;
    console.log(`userMetadata in MentorCard ${JSON.stringify(userMetadata)}, ${menteeUid}`)

    const onMentorSignup = async ({ menteeUid, mentorId }) => {
        console.log(`menteeUid ${menteeUid} mentorId ${mentorId}`)
        setSignupStatus('pending');

        try {
            const result = await signupMenteeForMentor({ mentorId }); // TODO-akhilz Correct this disaster
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
    const is_available = max_mentor_capacity - current_mentee_count > 0;

    return (
        <div className='mentor-card-container' >
            <div className='image-container'>
                <img src={image_url} alt='mentor' onClick={() => openModal(mentor)} />
                {is_registered && <div className='registered-overlay'>Requested</div>}
                {!is_registered && !is_available && <div className='registered-overlay'>Class full</div>}
                {signupStatus === 'pending' && <div className='registered-overlay'>Requesting...</div>}
                {!is_registered && is_available && signupStatus === 'idle' && choicesRemaining > 0 && (
                    <Button
                        buttonType='inverted'
                        onClick={() => onMentorSignup({ menteeUid, mentorId: mentor_id })}
                        className='signup-button'
                    >
                        Sign Up
                    </Button>
                )}

                {isBioVisible && (
                    <div className='bio-modal'>
                        <div className='bio-content'>
                            <h2>{name}'s Bio</h2>
                            <p>Their bio</p>
                            <button onClick={() => setBioVisible(false)}>Close</button>
                        </div>
                    </div>
                )}
            </div>

            <div className='footer'>
                <div className='row'>
                    <div className='name'><a href='#' onClick={handleBioLinkClick}>{name}</a></div>

                    {!is_registered && is_available && (current_mentee_count > 0) && <div className='slots'>{max_mentor_capacity - current_mentee_count} left!</div>}
                    {/* {signupStatus === 'success' && <p>Signed up successfully!</p>} */}
                </div>
                <div className='full-width'>
                    {signupStatus === 'error' && <p>Error: {errorMessage}</p>}
                </div>
            </div>
            <Modal show={showModal} onClose={closeModal} name={selectedMentor.name} bio={selectedMentor.description}>
                <img src={image_url} alt={name} />
            </Modal>
        </div >
    )
}

export default MentorCard;