import Button from '../button/button.component';
import './mentor-card.styles.scss'

const MentorCard = ({ mentor }) => {
    const { name, price, image_url } = mentor;
    return (< div className='mentor-card-container' >
        <img src={image_url} alt='mentor' />
        <div className='footer'>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
            <Button buttonType='inverted'>Sign Up</Button>
        </div>
    </div >
    )
}

export default MentorCard;