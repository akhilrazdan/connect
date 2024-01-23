import React, { useState, useEffect } from 'react';
import './modal.styles.scss'; // Import your CSS for styling

const Modal = ({ show, onClose, name, bio, children }) => {
    const [isLargeImage, setIsLargeImage] = useState(false);

    useEffect(() => {
        const checkImageSize = () => {
            const imageElement = document.querySelector('.modal-image');
            if (imageElement) {
                // If the image height is close to the viewport height, consider it a large image
                setIsLargeImage(imageElement.offsetHeight > window.innerHeight * 0.6);
            }
        };

        window.addEventListener('resize', checkImageSize);
        checkImageSize();

        // Cleanup the event listener
        return () => {
            window.removeEventListener('resize', checkImageSize);
        };
    }, [children]); // Re-run when the image changes

    if (!show) {
        return null;
    }

    const textPanelClass = isLargeImage ? 'modal-text-overlay' : 'modal-text';

    return (
        <div className="modal" onClick={onClose}>
            <span className="close" onClick={onClose}>&times;</span>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-image-container">
                    {children} {/* This is where the image is rendered */}
                </div>
                <div className={textPanelClass}>
                    <h2 className="modal-name">{name}</h2>
                    <p className="modal-bio">{bio}</p>
                </div>
            </div>
        </div>
    );
};

export default Modal;