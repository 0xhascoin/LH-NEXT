import moment from 'moment';
import React from 'react';


const LobbyJob = ({ loading, job }) => {

    // console.log(job, "JOB")

    // function numberWithCommas(x) {
    //     console.log(x)
    //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // }

    // if(loading) return "H"

    return (
        <div className="job">
            <div className="header">
                <div className="logo">
                    <img src={job.companyLogo} />
                </div>
                <div className="text">
                    <h1>{job.companyName}</h1>
                </div>
            </div>
            <div className="job-title">
                {job.jobTitle}
            </div>

            <div className="tags-container">
                <span className="tag is-info is-light">
                    {job.jobType}
                </span>
                <span className="tag is-info is-light">
                    {job.jobLevel} Level
                </span>
                <span className="tag is-primary is-light">
                    {job.jobSalary} {job.currency}
                </span>
            </div>
            <div className="foot">
                <p className="text">
                    {moment(job.postedDate).fromNow()}
                </p>
            </div>
        </div>
    )
};

export default LobbyJob;