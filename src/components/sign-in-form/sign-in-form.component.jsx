import { useState, useContext } from "react";
import {
    signInWithGooglePopup,
    signInWithUserWithEmailAndPassword as signInAuthUserWithEmailAndPassword,
    getIdTokenResult
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { setUserClaims } from "../../utils/firebase/connect-api.utils";
import { UnifiedUserContext } from "../../contexts/unified-user.context";
import { isUserAllowListed, createUserUsingBackendApi } from "../../utils/firebase/connect-api.utils";
import ForgotPassword from "../forgot-password/forgot-password.component";
import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
}


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const { currentUser, setCurrentUser, setRole } = useContext(UnifiedUserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const resetFormFields = () => {
        setError('')
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        setLoading(true); // Start loading
        setError('');

        try {
            const { user } = await signInWithGooglePopup();
            const isUserAllowed = await isUserAllowListed();

            if (!isUserAllowed) {
                setError('Have you registered this email with us yet? Email mentorship@batonnageforum.com to add it to the allow list');
                setCurrentUser(null);
                return;
            }
            await createUserUsingBackendApi(user);
            const idTokenResult = await getIdTokenResult(true);
            console.log(`Setting user claims idTokenResult ${JSON.stringify(idTokenResult)}, role ${idTokenResult.claims.role}`)
            setRole(idTokenResult.claims?.role ?? 'guest');
            setCurrentUser({ ...user, role: idTokenResult.claims?.role ?? 'guest' });
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError("Cannot create user, email already in use");
            } else {
                console.log(`Error ${error}`)
                setError("Error signing in: ", error.message);
            }
        } finally {
            setLoading(false); // Stop loading
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            setError('')
            const { user } = await signInAuthUserWithEmailAndPassword(email, password)
            const isUserAllowed = await isUserAllowListed();

            if (!isUserAllowed) {
                setError('Your email is not authorized for the mentorship program per our records. Email mentorship@batonnageforum.com for further clarification.');
                await setUserClaims();
                setCurrentUser(null);
                return;
            }

            await setUserClaims();
            const idTokenResult = await getIdTokenResult(true);
            console.log(`Setting idTokenResult after sign in ${idTokenResult.claims?.role ?? 'guest'} ${idTokenResult}, role ${idTokenResult.claims.role}`)
            setRole(idTokenResult.claims?.role ?? 'guest')
            setCurrentUser({ ...user, role: idTokenResult.claims?.role ?? 'guest' });
            resetFormFields();
        } catch (error) {
            let errorMessage = error.message;
            if (error.message.startsWith("Firebase:")) {
                errorMessage = error.message.substring("Firebase: ".length).trim();
            }
            switch (error.code) {
                case 'auth/invalid-credential':
                    setError('Invalid credentials. ')
                    break;
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
        } finally {
            setLoading(false)
        }
    }
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value })
    };

    return (
        <div className="sign-in-container">
            <div className="sign-in-text">
                <h2>Already have an account?</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={handleSubmit}>

                    <FormInput label="Email" required type="email" onChange={handleChange} name="email" value={email} />

                    <FormInput label="Password" required type="password" onChange={handleChange} name="password" value={password} />
                    <div className="buttons-container">
                        <Button type="submit" loading={loading}>Sign In</Button>
                        <Button type='button' buttonType='google' loading={loading} onClick={signInWithGoogle}>Google sign in</Button>
                    </div>
                </form>
                {(error) && <p className="error-message">{error}</p>}
            </div>

        </div>


    )
}

export default SignInForm;