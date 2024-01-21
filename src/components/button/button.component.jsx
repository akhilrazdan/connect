import './button.styles.scss'

const BUTTON_TYPES_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({ children, buttonType, className, ...otherProps }) => {
    // Combine the button-container class, any specific button type class, and any additional class names passed in
    const combinedClassName = `button-container ${BUTTON_TYPES_CLASSES[buttonType] || ''} ${className || ''}`.trim();

    return (
        <button className={combinedClassName} {...otherProps}>
            {children}
        </button>
    );
};

// Write the program
export default Button;
