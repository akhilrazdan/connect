import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { useState } from "react";
import { sendForgotPasswordEmail } from "../../utils/firebase/firebase.utils";
import './forgot-password.styles.scss'
const defaultFormFields = {
    email: '',
}
const ForgotPassword = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, } = formFields;
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value })
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            await sendForgotPasswordEmail(email);
            setMessage('Check your email for password reset link');
        } catch (error) {
            let errorMessage = error.message;
            if (error.message.startsWith("Firebase:")) {
                errorMessage = error.message.substring("Firebase: ".length).trim();
            }
            switch (error.code) {
                case 'auth/invalid-credential':
                    setError('Invalid credentials. ')
                    break;
                default:
                    setError(errorMessage);
            }
            return;
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="forgot-password-container">
            <h2>Forgot password?</h2>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" required type="email" onChange={handleChange} name="email" value={email} />
                <Button type="submit" loading={loading}>Send password reset email</Button>
                {(message) && <p className="message">{message}</p>}
            </form>
            {(error) && <p className="error-message">{error}</p>}
        </div>
    )
}
export default ForgotPassword;