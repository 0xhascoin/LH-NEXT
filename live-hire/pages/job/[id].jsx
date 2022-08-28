import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig';
import Loading from '../../components/loading';
import Header from '../../components/header';
import { BsBookmark } from 'react-icons/bs'
import parse from 'html-react-parser'
import moment from 'moment'
import useAuth from '../../hook/auth';

const Job = () => {
    const router = useRouter()
    const { id } = router.query
    const { user } = useAuth();


    const [job, setJob] = useState({});
    const [loading, setLoading] = useState(false);
    const [userApplied, setUserApplied] = useState(false);

    useEffect(() => {
        const getJobFromFirebase = async () => {
            setLoading(true)
            const docRef = doc(db, "jobs", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setJob(docSnap.data())
                checkIfUserIsApplied(docSnap.data())
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
            setLoading(false);
        }
        getJobFromFirebase()
    }, [])

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const applyToJob = async () => {
        const userRef = doc(db, "users", user.uid);
        const jobRef = doc(db, "jobs", id);

        await updateDoc(userRef, {
            applications: arrayUnion(id)
        });

        await updateDoc(jobRef, {
            applications: arrayUnion(user.uid)
        });

        setUserApplied(true);
    }

    const checkIfUserIsApplied = async (job) => {
        job.applications && job.applications.map((app) => {
            if (app === user?.uid) {
                setUserApplied(true)
            }
        })
    }


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
                                <div className="job-details">
                                    <div className="detail">
                                        <h2>Job Type</h2>
                                        <h4>{job.jobType}</h4>
                                    </div>
                                    <div className="detail">
                                        <h2>Job Level</h2>
                                        <h4>{job.jobLevel}</h4>
                                    </div>
                                    <div className="detail">
                                        <h2>Job Salary</h2>
                                        <h4 className='has-text-primary'>{numberWithCommas(parseInt(job.jobSalary))} {job.currency}</h4>
                                    </div>
                                    <div className="detail">
                                        <h2>Posted</h2>
                                        <h4>{job.postedDate ? `${moment(job.postedDate).fromNow()}` : 'Posted 8 Days ago'}</h4>
                                    </div>
                                    <div className="detail">
                                        <h2>Interview</h2>
                                        <h4 className='has-text-info'>{job.postedDate ? `${moment(job.interviewDate).fromNow()}` : 'Posted 8 Days ago'}</h4>
                                    </div>
                                </div>
                                <div className="job-description">
                                    <h2 className="heading">Company Description</h2>
                                    <div>{typeof (job.companyDescription) == "string" && parse(job.companyDescription)}</div>
                                </div>
                                <div className="job-description">
                                    <h2 className="heading mb-5">Job Description</h2>
                                    <div>{typeof (job.jobDescription) == "string" && parse(job?.jobDescription)}</div>
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
                                <div className="buttons has-text-centered">
                                    {userApplied ? (
                                        <p className='has-text-centered'>Your RSVP has been made! <br />Thank You.</p>
                                    ) : (
                                        <>
                                            {user === null || user === undefined ? (
                                                <button className="button" onClick={() => router.push("/login")}>Login to apply</button>
                                            ) : (
                                                <button className="button rsvp" onClick={applyToJob}>RSVP Here</button>
                                            )}
                                            </>
                                    )}
                                    {user === null || user === undefined && <button className="button disabled">You must login</button>}
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