import SignUpForm from "../sign-up-form/sign-up-form.component";
import SignInForm from "../sign-in-form/sign-in-form.component";
import ForgotPassword from "../forgot-password/forgot-password.component";
import { useState } from "react";

import './authentication.styles.scss';

const Authentication = () => {
    const [formToShow, setFormToShow] = useState('signIn'); // 'signIn' or 'signUp'

    return (
        <div className="authentication-container">
            <img src='https://images.squarespace-cdn.com/content/5af37e4ca9e028636a580477/1600106491825-KJTT5XMGWCY6M4HJF48S/BatonnageLogo_Orange_Mentorship.png?content-type=image%2Fpng' />
            {formToShow === 'signIn' && <SignInForm />}
            {formToShow === 'signUp' && <SignUpForm />}
            {formToShow === 'forgotPassword' && <ForgotPassword />}
            <div className="switch-form">
                {formToShow === 'signIn' ? (
                    <p>New here? <span onClick={() => setFormToShow('signUp')}>Sign Up</span>
                        <br />
                        <span onClick={() => setFormToShow('forgotPassword')}>Forgot Password?</span>
                    </p>
                ) : (
                    <p>Already have an account? <span onClick={() => setFormToShow('signIn')}>Sign In</span> <br></br>
                        {formToShow === 'forgotPassword' ? <>New account <span onClick={() => setFormToShow('signUp')}>Sign Up</span></> : ""}
                    </p>
                )}
            </div>
        </div >
    );
};

export default Authentication;