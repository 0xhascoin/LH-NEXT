import React from 'react';

const AccountErrorModal = ({ setErrorMessage, errorMessage, setShowAccountErrorModal, showAccountErrorModal}) => {
    
    const closeModal = () => {
        setErrorMessage(null)
        setShowAccountErrorModal(false);
    }
    return (
        <div class={showAccountErrorModal ? "modal account-error is-active": "modal account-error"}>
            <div class="modal-background" onClick={closeModal}></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <button class="delete" aria-label="close" onClick={closeModal}></button>
                </header>
                <section class="modal-card-body">
                    <h2 className="message">{errorMessage}</h2>
                </section>
            </div>
        </div>
    )
};

export default AccountErrorModal;