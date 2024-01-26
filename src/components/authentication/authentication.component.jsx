
import SignUpForm from "../sign-up-form/sign-up-form.component";
import SignInForm from "../sign-in-form/sign-in-form.component";
import './authentication.styles.scss';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UnifiedUserContext } from "../../contexts/unified-user.context";

const Authentication = () => {
    const navigate = useNavigate()
    const { isSignInProcessComplete, currentUser } = useContext(UnifiedUserContext)
    useEffect(() => {
        if (currentUser) {
            navigate('/')
        }
    }, [currentUser, isSignInProcessComplete]);

    return (<div className="authentication-container">
        <SignInForm />
        <SignUpForm />
    </div>)
}
export default Authentication;