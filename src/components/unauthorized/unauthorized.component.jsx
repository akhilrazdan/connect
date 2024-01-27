import './unauthorized.styles.scss'

const Unauthorized = () => {
    // TODO(akhilz) Please change this to right contact. 
    return (
        <div className='unauthorized-container'>
            <p>You are not authorized to access the mentorship page. This could happen if your email is not marked as allowed in the Batonnage backend.</p>
            <p>Are you signed in with the email that you provided to Batonnage? Contact if you need assistance</p>
        </div >
    )
}
export default Unauthorized;