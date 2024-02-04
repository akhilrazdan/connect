import { useContext, useEffect } from 'react';
import './unauthorized.styles.scss'
import { UnifiedUserContext } from '../../contexts/unified-user.context';

const Unauthorized = () => {

    return (
        <div className='unauthorized-container'>
            <p>You are not authorized to access the mentorship page. This could happen if your email is not marked as allowed in the Batonnage backend.</p>
            <p>Are you signed in with the email that you provided to Batonnage? Contact <span className='email'>mentorship@batonnageforum.com</span> if you need assistance</p>
        </div >
    )
}
export default Unauthorized;