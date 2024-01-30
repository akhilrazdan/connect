import { useState, useContext } from "react";
import { createAuthUserWithEmailAndPassword, getIdTokenResult } from "../../utils/firebase/firebase.utils";
import { setUserClaims, createUserUsingBackendApi } from "../../utils/firebase/connect-api.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form.styles.scss';
import { useNavigate } from "react-router-dom";
import { UnifiedUserContext } from "../../contexts/unified-user.context";


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const { setRole } = useContext(UnifiedUserContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            console.log(`Signup Form user ${JSON.stringify(user)} ${displayName}`);
            await setUserClaims();
            await createUserUsingBackendApi(user, { displayName });
            const idTokenResult = await getIdTokenResult(true);
            console.log(`idTokenResult after sign in ${idTokenResult}, role ${idTokenResult.claims.role}`)
            setRole(idTokenResult.claims.role);
            checkUserRoleAndNavigate(idTokenResult.claims.role);
            resetFormFields();
        } catch (error) {
            // Check if the error message starts with "Firebase:" and remove it
            let errorMessage = error.message;
            if (error.message.startsWith("Firebase:")) {
                errorMessage = error.message.substring("Firebase: ".length).trim();
            }
            if (error.code === 'auth/email-already-in-use') {
                setError(errorMessage);
            } else {
                setError(`Error creating user: ${errorMessage}`);
            }
        }

    }
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value })

    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password. </span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display name" required type="text" onChange={handleChange} name="displayName" value={displayName} />

                <FormInput label="Email" required type="email" onChange={handleChange} name="email" value={email} />

                <FormInput label="Password" required type="password" onChange={handleChange} name="password" value={password} />

                <FormInput label="Confirm Password" required type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword} />

                <Button buttonType='button' type="submit">Sign Up</Button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>

    )
}

export default SignUpForm;