import React from 'react';

const JobPreviewModal = ({ showPreview, setShowPreview, selectedJob }) => {

    const closeModal = () => {
        setShowPreview(false);
    }
    return (
        <div className="job-preview-modal-container">
            <div className={showPreview ? "modal is-active" : "modal"}>
                <div className="modal-background" onClick={closeModal}></div>
                <div className="modal-card">

                    <section className="modal-card-body">
                        <div className="close-button">
                            <button className="delete" aria-label="close" onClick={closeModal}></button>
                        </div>
                        <div className="view-job-container">
                            <div className="job-header">
                                <div className="header-left">
                                    <div className="logo">
                                        <img src={selectedJob?.companyLogo} alt="" />
                                    </div>
                                    <div className="titles">
                                        <p className="job-title">{selectedJob?.jobTitle}</p>
                                        <p className="company-name">{selectedJob?.companyName}</p>
                                        <p className="company-name has-text-primary">{selectedJob?.jobSalary} {" "} {selectedJob?.currency}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="job-description">
                                <h2 className="heading">Company Description</h2>
                                <p>{selectedJob?.companyDescription}</p>
                            </div>
                            <div className="job-description">
                                <h2 className="heading mb-5">Job Description</h2>
                                <p>{selectedJob.jobDescription}</p>
                                <p>{selectedJob.jobDescription}</p>
                            </div>
                            <div className="job-description">
                                <h2 className="heading mb-5">Interview Details</h2>
                                <p>Interview Date: {selectedJob.interviewDate}</p>
                                <p>Interview Time: {selectedJob.interviewTime}</p>
                            </div>

                            <div className="skills-container">
                                <h2 className="heading">Skills Required</h2>
                                <span className="tag">UI Designer</span>
                                <span className="tag">Figma</span>
                                <span className="tag">Landing Page</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
};

export default JobPreviewModal;