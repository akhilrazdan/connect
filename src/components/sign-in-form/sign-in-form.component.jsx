import { useState, useContext } from "react";
import {
    signInWithGooglePopup,
    signInWithUserWithEmailAndPassword as signInAuthUserWithEmailAndPassword,
    getIdTokenResult
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { setUserClaims, createUserUsingBackendApi } from "../../utils/firebase/connect-api.utils";
import { UnifiedUserContext } from "../../contexts/unified-user.context";
import { useNavigate } from "react-router-dom";
import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
}


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const { loading, setSignInProcessComplete, setRole } = useContext(UnifiedUserContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const checkUserRoleAndNavigate = (role) => {
        if (role === 'mentee') {
            console.log('mentee navigated')
            navigate('/');
        } else {
            console.log('guest navigated')
            navigate('/unauthorized', { replace: true });
        }
    }
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        try {

            await setUserClaims();
            const response = await createUserUsingBackendApi(user)
            const idTokenResult = await getIdTokenResult(true);
            console.log(`idTokenResult after sign in ${idTokenResult}, role ${idTokenResult.claims.role}`)
            setRole(idTokenResult.claims.role);
            checkUserRoleAndNavigate(idTokenResult.claims.role);
            setSignInProcessComplete(true);
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError("Cannot create user, email already in use");
            } else {
                setError("Error signing in: ", error.message);
            }
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setError('')
            const { user } = await signInAuthUserWithEmailAndPassword(email, password)
            await setUserClaims();
            const idTokenResult = await getIdTokenResult(true);
            console.log(`idTokenResult after sign in ${idTokenResult}, role ${idTokenResult.claims.role}`)
            setRole(idTokenResult.claims.role);
            checkUserRoleAndNavigate(idTokenResult.claims.role);
            resetFormFields();
        } catch (error) {
            let errorMessage = error.message;
            if (error.message.startsWith("Firebase:")) {
                errorMessage = error.message.substring("Firebase: ".length).trim();
            }
            switch (error.code) {
                case 'auth/wrong-password':
                    setError('Incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    setError('No user associated with this email');
                    break;
                case 'auth/invalid-credential':
                    setError('Invalid credentials. ')
                default:
                    setError(errorMessage);
            }
        }


    }
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value })
    };

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Email" required type="email" onChange={handleChange} name="email" value={email} />

                <FormInput label="Password" required type="password" onChange={handleChange} name="password" value={password} />
                <div className="buttons-container">
                    <Button type="submit" loading={loading}>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>

    )
}

export default SignInForm;