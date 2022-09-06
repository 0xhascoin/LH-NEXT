import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import JobsList from '../components/jobsList';
import Loading from '../components/loading';
import PageBanner from '../components/pageBanner';
import { db } from '../firebaseConfig';
import useAuth from '../hook/auth';

const Saved = () => {
    const [usersJobs, setUsersJobs] = useState([]);

    const { user, error, getUsersJobs } = useAuth();

    useEffect(() => {
        const getUsersJobs = async () => {
            if (error === "" || error === undefined) {

                const userRef = doc(db, "users", user.uid);
                const userData = await getDoc(userRef);
                const { applications } = userData.data();
                const appArray = [];

                if (applications !== undefined) {
                    for (let i = 0; i < applications.length; i++) {
                        const jobRef = doc(db, "jobs", applications[i]);
                        const jobData = await getDoc(jobRef);
                        const { id } = jobData;
                        appArray.push({id, ...jobData.data()});
                    }

                    console.log(appArray);
                    setUsersJobs(appArray)
                }

                console.log("usersJobs: ", appArray)
            }

        }
        getUsersJobs();
    }, [])
    return (
        <div>
            <Header />
            <PageBanner page={"Your Job Applications"} />
            {usersJobs.length ? <JobsList allJobs={usersJobs} /> : (
                <Loading />
            )}
        </div>
    )
};

export default Saved;