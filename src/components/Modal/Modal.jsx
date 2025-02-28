import React from 'react';
import useModalStore from '../../store/ModalStore.js';
import '../../styles/Modal.scss';

const Modal = () => {
    const { isOpen, content, title, closeModal } = useModalStore()
    if (!isOpen) return null

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button
                    className="close-button"
                    onClick={closeModal}
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

export default Modal;