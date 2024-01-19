import Button from '../button/button.component';
import './mentor-card.styles.scss'

const MentorCard = ({ mentor }) => {
    const { name, price, imageUrl } = mentor;
    return (< div className='mentor-card-container' >
        <img src={imageUrl} alt='mentor' />
        <div className='footer'>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
            <Button buttonType='inverted'>Sign Up</Button>
        </div>
    </div >
    )
}

export default MentorCard;