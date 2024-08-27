// Modal.jsx
import React from 'react';
import './Modal.scss';

export const Modal = ({ isOpen, onClose, content }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>
                <iframe src={content} title="Restaurant Details" className="modal-iframe"></iframe>
            </div>
        </div>
    );
};
