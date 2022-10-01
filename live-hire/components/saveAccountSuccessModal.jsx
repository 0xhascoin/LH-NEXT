import React from 'react';
import { AiOutlineCloseSquare } from 'react-icons/ai';

const SaveAccountSuccessModal = ({ setErrorMessage, errorMessage, setShowSaveAccountSuccessModal, showSaveAccountSuccessModal }) => {

    const closeModal = () => {
        setErrorMessage(null)
        setShowSaveAccountSuccessModal(false);
    }
    return (
        <div className={showSaveAccountSuccessModal ? "modal account-error is-active" : "modal account-error"}>
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <button className="delete" aria-label="close" onClick={closeModal}></button>
                </header>
                <section className="modal-card-body">
                    <div className="icon success">
                        <AiOutlineCloseSquare />
                    </div>
                    <h2 className="message success">{errorMessage}</h2>
                </section>
            </div>
        </div>
    )
};

export default SaveAccountSuccessModal;