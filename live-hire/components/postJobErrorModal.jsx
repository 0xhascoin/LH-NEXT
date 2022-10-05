import React, { useEffect } from 'react';
import { AiOutlineCloseSquare } from 'react-icons/ai';

const LH_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAOxAAADsQBlSsOGwAABF9pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nPgo8cmRmOlJERiB4bWxuczpyZGY9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMnPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6QXR0cmliPSdodHRwOi8vbnMuYXR0cmlidXRpb24uY29tL2Fkcy8xLjAvJz4KICA8QXR0cmliOkFkcz4KICAgPHJkZjpTZXE+CiAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9J1Jlc291cmNlJz4KICAgICA8QXR0cmliOkNyZWF0ZWQ+MjAyMi0wNS0xNjwvQXR0cmliOkNyZWF0ZWQ+CiAgICAgPEF0dHJpYjpFeHRJZD4zYjAxMjVjNC1lYjc2LTQ0NjctODc1Mi05YTI5MWRiY2RhMTM8L0F0dHJpYjpFeHRJZD4KICAgICA8QXR0cmliOkZiSWQ+NTI1MjY1OTE0MTc5NTgwPC9BdHRyaWI6RmJJZD4KICAgICA8QXR0cmliOlRvdWNoVHlwZT4yPC9BdHRyaWI6VG91Y2hUeXBlPgogICAgPC9yZGY6bGk+CiAgIDwvcmRmOlNlcT4KICA8L0F0dHJpYjpBZHM+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOmRjPSdodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyc+CiAgPGRjOnRpdGxlPgogICA8cmRmOkFsdD4KICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+TDwvcmRmOmxpPgogICA8L3JkZjpBbHQ+CiAgPC9kYzp0aXRsZT4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRm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gg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAHPTT0A4EkdPHhwvP3222NjY2OsrPz565LPPvts3L17d4nLYDqCDuwZKysr48MPPxwffPDBWF1dfeLvf/nll4JOlqADe8Ynn3wy3nvvvalnwCz5DR3YE959910xh8cQdGBP2NnZmXoCzJqgA3vCG2+8MfUEmDVBB2Zv//79Y3t7e+oZMGuCDsze1tbW2Ldv39QzYNYEHZi9ra2tqSfA7Ak6MHsvv/zy1BNg9gQdmL3Nzc2pJ8DsCTowey+99NLUE2D2BB2YvY2NjaknwOwJOjB7R44cmXoCzJ6gA7Mn6PD/CTowe4cPH556AsyeoAOzd+jQoaknwOwJOjBrL7zwwnj++eenngGz533osId8+umn49GjR1PPeKb2798/9QTYEwQd9pB33nln6gnATAk6PAVHjx4di8VivPXWW1NPAf6hBB2e0NbW1lgsFmOxWIzTp0+PxWIxjh49OvUs4B9O0OExjh079odwLxYL/7gGZknQ4b9sbm6OCxcujJ2dnXHw4MGp5wD8KYIOv7O9vT0+//zz8eqrr049BeCJeA4dfufixYtiDuxJgg67Njc3x7lz56aeAfCXCDrsev3116eeAPCXCTrsWl1dnXoCwF8m6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABCwb319/dHUIwCAv8cVOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAT8B61bqNnBl6ngAAAAAElFTkSuQmCC";


const PostJobErrorModal = ({ postJobError, setPostJobError, job }) => {

    const closeModal = () => {
        setPostJobError(false);
    }


    return (
        <div className="post-job-error-modal">
            <div className={postJobError ? "modal is-active" : "modal"}>
                <div className="modal-background" onClick={closeModal}></div>

                <div className="modal-card">
                    <header className="modal-card-head">
                        <button className="delete" aria-label="close" onClick={closeModal}></button>
                    </header>
                    <div className="modal-heading">
                        <div className="company-logo">
                            <img src={LH_LOGO} />
                        </div>
                        <div className="heading-title">
                            <h2>Post Job Error</h2>
                            <p>Please read the error message below in order to fix the issue that occurred.</p>
                        </div>
                    </div>
                    <div className="modal-card-body">
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
            </div >
        </div >
    )
};

export default PostJobErrorModal;