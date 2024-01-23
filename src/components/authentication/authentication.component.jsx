
import SignUpForm from "../sign-up-form/sign-up-form.component";
import SignInForm from "../sign-in-form/sign-in-form.component";
import './authentication.styles.scss';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/user.context";

const Authentication = () => {
    const navigate = useNavigate()
    const { currentUser } = useContext(UserContext)
    useEffect(() => {
        if (currentUser) {
            navigate('/')
        }
        return () => { }
    }, [currentUser, navigate]);

    return (<div className="authentication-container">
        <SignInForm />
        <SignUpForm />
    </div>)
}
export default Authentication;