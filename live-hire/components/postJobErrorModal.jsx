import React, { useEffect } from 'react';
import { AiOutlineCloseSquare } from 'react-icons/ai';

const PostJobErrorModal = ({ postJobError, setPostJobError, job }) => {

    const closeModal = () => {
        setPostJobError(false);
    }

    useEffect(() => {
        if (job.companyName.length > 3 ) {
            console.log("PASSED");
        } else {
            console.log("FAILED");
        }
    }, [])


    return (
        <div className="post-job-error-modal">
            <div className={postJobError ? "modal is-active" : "modal"}>
                <div className="modal-background" onClick={closeModal}></div>
                <div className="modal-card">
                    <div className="modal-card-body">
                    <div className="close-button">
                        <button class="delete" aria-label="close" onClick={closeModal}></button>
                    </div>
                        <div className="icon">
                            <AiOutlineCloseSquare />
                        </div>
                        <ul className="issues">
                            {job.companyName.length < 3 && <li>Company Name must be longer than 3 characters</li>}
                            {job.companyDescription.length < 50 && <li>Company Description must be longer than 50 characters</li>}
                            {job.companyLogo === "" && <li>You must upload a company logo to go with your job post</li>}
                            {job.jobTitle.length < 5 && <li>Job Title must be longer than 5 characters</li>}
                            {job.jobType == "" && <li>You must select a Job Type from the dropdown</li>}
                            {job.jobLevel == "" && <li>You must select a Job Level from the dropdown</li>}
                            {job.jobDescription.length < 100 && <li>Job Description must be longer than 100 characters</li>}
                            {job.currency == "" && <li>You must select a currency from the dropdown</li>}
                            {job.jobSalary == "" && <li>Make sure to enter the salary for this role</li>}
                            {job.interviewDate == "" && <li>You must select a interview date</li>}
                            {job.interviewTime == "" && <li>You must select a interview time</li>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PostJobErrorModal;