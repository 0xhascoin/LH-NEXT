import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { useRouter } from 'next/router';
import moment from 'moment';

const Job = ({ job }) => {
  const router = useRouter()
  const [desc, setDesc] = useState("")

  // console.log("Job: ", job)
  useEffect(() => {
    console.log("useEffect Job: ", job)
    // setDesc(job.jobDescription)
}, [])


  return (
    <div className="job-container" onClick={() => router.push(`/job/${job.id}`)}>
      
      {/* Heading */}
        {/* Logo */}
        {/* Job Title */}
        {/* Company Name - Location - Job Type */}

        

      <div className="job-heading">
        <div className="job-logo">
          <img src={job.companyLogo} />
        </div>
        <div className="job-title">
          <h1>{job.jobTitle}</h1>
            <h1 className="company-details">
              <span>{job.companyName}</span> - 
              {" "}{job.jobLocation} | {job.jobType}
            </h1> 
        </div>
      </div>

      {/* Short description */}
      <div className="job-description">
        {job?.jobDescription && (
          <>
          {parse(job?.jobDescription?.slice(0, 160))}
          </>
        )}
        {/* {desc !== "" && `${parse(desc)}`} */}
      </div>

      {/* Job Details */}
        {/* Salary */}
        {/* Posted */}
      <div className="job-details">
        <div className="salary">
          <p><span>${parseInt(job.jobSalary / (1000) / (12))}K</span>/month</p>
        </div>
        <div className="posted">
          <p>{moment(job.postedDate).fromNow()}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="job-buttons">
        <button className="button view" onClick={() => router.push(`/job/${job.id}`)}>View Details</button>
        <button className="button apply" onClick={() => router.push(`/job/${job.id}`)}>Apply Now</button>
      </div>
      
    </div>
  )
}

export default Job;