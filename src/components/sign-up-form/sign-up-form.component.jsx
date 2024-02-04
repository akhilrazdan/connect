import { useState, useContext, useEffect } from "react";
import { createAuthUserWithEmailAndPassword, deleteFirebaseUser, getIdTokenResult, signOutUser } from "../../utils/firebase/firebase.utils";
import { isUserAllowListed, createUserUsingBackendApi } from "../../utils/firebase/connect-api.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form.styles.scss';
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
    const { setRole, setCurrentUser } = useContext(UnifiedUserContext);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setError('')
            if (password !== confirmPassword) {
                setError("Passwords do not match");
                return;
            }
            setLoading(true);
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            const userDetails = await createUserUsingBackendApi(user, { displayName })
            console.log(`Setting currentUser to ${JSON.stringify(user)} and role to ${userDetails.role_name}`)
            setCurrentUser(user);
            setRole(userDetails.role_name);
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
        } finally {
            setLoading(false)
        }

    }
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value })

    };

    return (
        <div className="sign-up-container">

            <h2>Don't have an account?</h2>
            <span>Sign up using the email that you have provided to Batonnage Forum.</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display name" required type="text" onChange={handleChange} name="displayName" value={displayName} />

                <FormInput label="Email" required type="email" onChange={handleChange} name="email" value={email} />

                <FormInput label="Password" required type="password" onChange={handleChange} name="password" value={password} />

                <FormInput label="Confirm Password" required type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword} />

                <Button buttonType='button' type="submit" loading={loading}>Sign Up</Button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>

    )
}

export default SignUpForm;