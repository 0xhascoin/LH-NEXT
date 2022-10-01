import React from 'react';

const AccountErrorModal = ({ setErrorMessage, errorMessage, setShowAccountErrorModal, showAccountErrorModal}) => {
    
    const closeModal = () => {
        setErrorMessage(null)
        setShowAccountErrorModal(false);
    }
    return (
        <div className={showAccountErrorModal ? "modal account-error is-active": "modal account-error"}>
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <button className="delete" aria-label="close" onClick={closeModal}></button>
                </header>
                <section className="modal-card-body">
                    <h2 className="message">{errorMessage}</h2>
                </section>
            </div>
        </div>
    )
};

export default AccountErrorModal;