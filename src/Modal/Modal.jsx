import React from 'react';
import './Modal.scss';

export const Modal = ({ isOpen, onClose, content, title = "Details" }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button
                    className="close-button"
                    onClick={onClose}
                    aria-label="Close Modal"
                >
                    &times;
                </button>
                <iframe
                    src={content}
                    title={title}
                    className="modal-iframe"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};
