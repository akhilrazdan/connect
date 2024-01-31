
import SignUpForm from "../sign-up-form/sign-up-form.component";
import SignInForm from "../sign-in-form/sign-in-form.component";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UnifiedUserContext } from "../../contexts/unified-user.context";

import './authentication.styles.scss';

const Authentication = () => {
    const [formToShow, setFormToShow] = useState('signIn'); // 'signIn' or 'signUp'

    return (
        <div className="authentication-container">
            {formToShow === 'signIn' && <SignInForm />}
            {formToShow === 'signUp' && <SignUpForm />}
            <div className="switch-form">
                {formToShow === 'signIn' ? (
                    <p>New here? <span onClick={() => setFormToShow('signUp')}>Sign Up</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setFormToShow('signIn')}>Sign In</span></p>
                )}
            </div>
        </div>
    );
};

export default Authentication;