import React from 'react';

import { HiOutlineMail } from 'react-icons/hi'
import { GrGlobe } from 'react-icons/gr'

const ViewApplicationModal = ({
    showApplicationModal, setShowApplicationModal, displayApplication }) => {

    const closeModal = () => {
        setShowApplicationModal(false);
    }

    console.log("DISPLAY", displayApplication)

    const toTitleCase = (str) => {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    return (

        <div class={showApplicationModal ? "view-application-modal modal is-active" : "view-application-modal modal"}>
            <div class="modal-background" onClick={closeModal}></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <button class="delete" aria-label="close"
                        onClick={closeModal}></button>
                </header>
                <section class="modal-card-body">
                    <div className="columns">
                        <div className="column profile-details">
                            <div className="profile-heading">
                                <div className="profile-logo">
                                    <img src={displayApplication?.profileImage} />
                                </div>
                                <div className="profile-name">
                                    <h2>
                                        {displayApplication.firstName} {" "}
                                        {displayApplication.lastName}
                                    </h2>
                                </div>
                                <div className="profile-location">
                                    <GrGlobe />
                                    <p>{toTitleCase(displayApplication.location)}</p>
                                </div>
                                <div className="profile-location">
                                    <HiOutlineMail />
                                    <p>{toTitleCase(displayApplication.email)}</p>
                                </div>
                                <div className="profile-skills">
                                    <h2>
                                        Skills
                                    </h2>
                                    <div className="details-container">
                                        <div className="detail">
                                            {displayApplication.skills?.map((skill) => (
                                                <p className="tag is-info is-light">
                                                    {toTitleCase(skill)}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {displayApplication.resume && (
                                    <div className="profile-resume">
                                        <h2>Resume:</h2>
                                        <a className="button is-info is-light is-outlined my-2"
                                            href={`${displayApplication.resume}`}>
                                            View Resume
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* {displayApplication.workExperienceList || displayApplication.educationList && ( */}
                        <div className="column experience-details">
                            {displayApplication.workExperienceList && (
                                <div className="exp-section">
                                    <h2 className="section-heading">
                                        Work Experience
                                    </h2>
                                    {displayApplication?.workExperienceList?.map((exp) => (
                                        <div className="exp">
                                            {console.log("Workexperiencelist: ", displayApplication.workExperienceList)}
                                            <h2>{exp.companyName}</h2>
                                            <h3>{exp.jobTitle}</h3>
                                            <p>{exp.from} - {exp.till}</p>
                                            <p>{exp.shortDesc}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="my-3" />
                            {displayApplication.educationList && (
                                <div className="exp-section">
                                    <h2 className="section-heading">
                                        Education
                                    </h2>
                                    {displayApplication?.educationList?.map((edu) => (
                                        <div className="exp">
                                            <h2>{edu.courseName}</h2>
                                            <h3>{edu.universityName}</h3>
                                            <p>{edu.from} - {edu.till}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* )} */}
                    </div>
                </section>
            </div>
        </div>

    )
}

export default ViewApplicationModal;