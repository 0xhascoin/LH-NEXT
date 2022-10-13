import React, { useState, useEffect } from 'react';
import { GrLocation, GrGlobe, GrFormNextLink } from 'react-icons/gr';
import { BsBriefcase, BsCalendarDate } from 'react-icons/bs';
import { BiTimeFive } from 'react-icons/bi';

const Application = ({ application, setShowApplicationModal, showApplicationModal, displayApplication, setDisplayApplication }) => {

    const selectDisplayApplication = (application) => {
        setDisplayApplication(application);
        console.log(application)
        setShowApplicationModal(true)
    }

    const toTitleCase = (str) => {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    return (
        <div className="application" onClick={() => selectDisplayApplication(application)}>
            <div className="profile-container">
                <img src={application?.profileImage} />
            </div>
            <div className="job-title-container">
                {application?.firstName && application?.lastName ? (
                    <p>{application.firstName} {application.lastName}</p>
                ) : (
                    <p>{toTitleCase(application?.email)}</p>
                )}
            </div>
            <div className="details-container">
                <div className="detail">
                    <GrGlobe />
                    <p>{toTitleCase(application.location)}</p>
                </div>
            </div>
            <div className="details-container">
                <div className="detail">
                    {application.skills?.map((skill, index) => (
                        <p className="tag is-info is-light" key={index}>
                            {toTitleCase(skill)}
                        </p>
                    ))}
                </div>
            </div>

            <div className="button-container">
                <button className="button">
                    <span>Expand</span>
                    <span className="icon is-small">
                        <GrFormNextLink />
                    </span>
                </button>
            </div>
        </div>
    )
}

export default Application