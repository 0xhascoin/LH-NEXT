import React, { useState, useEffect } from 'react';
import { withProtected } from '../hook/route'
import Header from '../components/header'
import PageBanner from '../components/pageBanner'
import useAuth from '../hook/auth';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { map } from '@firebase/util';
import {AiOutlineDownCircle} from 'react-icons/ai'

import Application from '../components/application';
import ViewApplicationModal from '../components/viewApplicationModal';

const Applications = () => {
    const [showContent, setShowContent] = useState(false);
    const [displayText, setDisplayText] = useState("Select a job");
    const [selectedJob, setSelectedJob] = useState(null);
    const [usersJobs, setUsersJobs] = useState();

    const [showApplicationModal, setShowApplicationModal] = useState(false);
    const [displayApplication, setDisplayApplication] = useState({})

    const [applications, setApplications] = useState([]);

    const { user, error } = useAuth();


    useEffect(() => {
        // Get all the jobs you posted and store them into a state
        const getUsersJobs = async () => {
            if (error === "" || error === undefined || user.uid !== null) {

                const userRef = doc(db, "users", user.uid);
                const userData = await getDoc(userRef);
                const { applications } = userData.data();
                const appArray = [];

                if (applications !== undefined) {
                    for (let i = 0; i < applications.length; i++) {
                        const jobRef = doc(db, "jobs", applications[i]);
                        const jobData = await getDoc(jobRef);
                        const { id } = jobData;
                        appArray.push({ id, ...jobData.data() });
                        console.log("JOB: ", { id, ...jobData.data() })
                    }

                    console.log("appArray: ", appArray);
                    setUsersJobs(appArray)
                }
            }

        }
        getUsersJobs();
    }, []);

    const selectJobFromDropdown = (job) => {
        setDisplayText(`${job.jobTitle} - ${job.companyName}`)
        setShowContent(false);
        setSelectedJob(job)
    }

    useEffect(() => {
        console.log("Selected new job")
        const getUsersThatApplied = async () => {
            let usersArr = [];
            if (selectedJob !== null) {
                for (let i = 0; i < selectedJob.applications.length; i++) {
                    const userRef = doc(db, "users", selectedJob.applications[i]);
                    const userData = await getDoc(userRef);
                    const { id } = userData;
                    usersArr.push({id, ...userData.data()})
                    console.log("HJSKHJK", {id, ...userData.data()})
                }
                setApplications(usersArr);
            }
        }
        getUsersThatApplied()
    }, [displayText])

    


    return (
        <>
            <Header />
            <PageBanner page={'All Applications'} />
            <div className="main">
                <div className="select-container">
                    <div className="select-heading"
                        onClick={() => setShowContent(!showContent)}>
                        <h3>{displayText}</h3>
                        <div className="icon">
                            <AiOutlineDownCircle />
                        </div>
                    </div>
                    {showContent && (
                        <div className="select-content">
                            {usersJobs?.map((job, index) => (
                                <div className="select-option" 
                                onClick={() => selectJobFromDropdown(job)}
                                key={index}>
                                    <h3>{job.jobTitle} - {job.companyName}</h3>
                                    <span className="tag is-light">{job.applications.length}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="application-container">
                {applications?.map((application, index) => (
                    <Application application={application} index={index}
                        setDisplayApplication={setDisplayApplication}
                        displayApplication={displayApplication}
                        showApplicationModal={showApplicationModal}
                        setShowApplicationModal={setShowApplicationModal}
                        key={index}
                    />
                ))}
            </div>
            
            {showApplicationModal && (
                <ViewApplicationModal
                    showApplicationModal={showApplicationModal}
                    setShowApplicationModal={setShowApplicationModal}
                    displayApplication={displayApplication}
                    setDisplayApplication={setDisplayApplication} />
            )} 
            </div>
        </>
    )
}

export default withProtected(Applications);