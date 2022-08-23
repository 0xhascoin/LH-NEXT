import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebaseConfig';
import { AiOutlineSearch } from 'react-icons/ai';
import moment from 'moment'


const JobsList = ({ allJobs }) => {
    const [displayJobs, setDisplayJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPages, setMaxPages] = useState(0);
    const [maxPerPage, setMaxPerPage] = useState(5);
    

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const changeDisplayJobs = (page) => {
        setCurrentPage(page)
        switch (page) {
            case 1: 
                setDisplayJobs(allJobs?.slice(0, maxPerPage));
                break;
            case 2:
                setDisplayJobs(allJobs?.slice(maxPerPage, maxPerPage*page))
                break;
            default:
                setDisplayJobs(allJobs.slice(maxPerPage*(page-1), maxPerPage*page))
        }
    }

    function timeSince(date) {

        var seconds = Math.floor((new Date() - date) / 1000);
      
        var interval = seconds / 31536000;
      
        if (interval > 1) {
          return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
          return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
          return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
      }

    useEffect(() => {
        console.log("LENGTH: ", allJobs.length)
        setDisplayJobs(allJobs.slice(0, maxPerPage))
        console.log("HERE: ", Math.ceil(allJobs?.length / maxPerPage))
        setMaxPages(Math.ceil(allJobs?.length / maxPerPage))
        setCurrentPage(1);
    }, [])

    return (
        <div className="jobs-list-container">
            <div className="jobs-list">
                {displayJobs?.map((job) => (
                    <div class="job">
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
                        <div className="desc">
                            <p>
                                {job.companyDescription.substring(0, 20)}...
                            </p>
                        </div>
                        <div className="tags-container">
                            <span className="tag is-info is-light">{job.jobType}</span>
                            <span className="tag is-info is-light">{job.jobLevel} Level</span>
                            <span className="tag is-primary is-light">${numberWithCommas(`${job.jobSalary}`)}</span>
                        </div>
                        <div className="foot">
                            <button className="button is-link">View Job</button>
                            <p className="text">{job.postedDate ? `${moment(job.postedDate).fromNow()}` : 'Posted 8 Days ago'}</p>
                        </div>
                    </div>
                ))}
            </div>
            <nav class="pagination-container pagination is-small" role="navigation" aria-label="pagination">
                <ul class="pagination-list">
                    {[...Array(maxPages)].map((_, index) => (
                    <li><a class={currentPage === index+1 ? "pagination-link is-current" : "pagination-link"} aria-label="Goto page 1" onClick={() => changeDisplayJobs(index+1)}>{index+1}</a></li>
                    ))}
                </ul>
            </nav>
        </div>
    )
};

export default JobsList;