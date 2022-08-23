import React from 'react';
import { AiOutlineCheckSquare } from 'react-icons/ai';

const PostJobSuccessModal = ({ submitted, setSubmitted, job }) => {

    const closeModal = () => {
        setSubmitted(false);
    }


    return (
        <div className="post-job-error-modal">
            <div className={submitted ? "modal is-active" : "modal"}>
                <div className="modal-background" onClick={closeModal}></div>
                <div className="modal-card">
                    <div className="modal-card-body">
                    <div className="close-button">
                        <button className="delete" aria-label="close" onClick={closeModal}></button>
                    </div>
                        <div className="icon success">
                            <AiOutlineCheckSquare />
                        </div>
                        <ul className="issues">
                            <li>Thank You {job?.companyName}</li>
                            <li>Your job has been posted successfully</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PostJobSuccessModal;