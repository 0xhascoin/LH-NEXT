import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig';
import Loading from '../../components/loading';
import Header from '../../components/header';
import {BsBookmark} from 'react-icons/bs'
import parse from 'html-react-parser'
import moment from 'moment'

const Job = () => {
    const router = useRouter()
    const { id } = router.query

    const [job, setJob] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getJobFromFirebase = async () => {
            setLoading(true)
            const docRef = doc(db, "jobs", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setJob(docSnap.data())
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
            setLoading(false);
        }
        getJobFromFirebase()
    }, [])


    return (
        <div className="page-container">
            <Header />
            {loading ? <Loading /> : (
                <div className="main-job-container">
                    <div className="columns">
                        <div className="column is-left is-8">
                            <div className="view-job-container">
                                <div className="job-header">
                                    <div className="header-left">
                                        <div className="logo">
                                            <img src={job?.companyLogo} alt="" />
                                        </div>
                                        <div className="titles">
                                            <p className="job-title">{job?.jobTitle}</p>
                                            <p className="job-title company-name">{job?.companyName}</p>
                                        </div>
                                    </div>

                                </div>
                                <div className="job-description">
                                    <h2 className="heading">Company Description</h2>
                                    <div>{typeof(job.companyDescription) == "string" && parse(job.companyDescription)}</div>
                                </div>
                                <div className="job-description">
                                    <h2 className="heading mb-5">Job Description</h2>
                                    <div>{typeof(job.jobDescription) == "string" && parse(job?.jobDescription)}</div>
                                </div>

                            </div>
                        </div>
                        <div className="column is-right">
                            <div className="apply-container">
                                <div className="company-logo">
                                    <img src={job.companyLogo} alt="" />
                                </div>
                                <div className="company-name">
                                    <p>{job.companyName}</p>
                                </div>
                                <div className="interview-details">
                                    <h2 className="heading">Interview details:</h2>
                                    <div className="interview">
                                    <p>{moment(`${job.interviewDate} ${job.interviewTime}`).format('MMMM Do YYYY, h:mm a')}</p>
                                    </div>
                                </div>
                                <div className="buttons">
                                    <button className="button rsvp">RSVP Here</button>
                                    <button className="button disabled">You must login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default Job;