import React, { useState, useEffect } from 'react';

import Header from '../components/header';
import PageBanner from '../components/pageBanner';
import Interview from '../components/interview';
import { withProtected } from '../hook/route';
import useAuth from '../hook/auth';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import moment from 'moment';
import { BsAppIndicator } from 'react-icons/bs';


const Manager = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [interviews, setInterviews] = useState([
        {
            companyName: "SportRetina", location: "Remote",
            date: "21st July 2023", time: "15:00pm",
            timezone: "Europe/London", status: 0
        },
        {
            companyName: "Computer Works", location: "Remote",
            date: "15th July 2023", time: "19:00pm",
            timezone: "Europe/Paris", status: 1
        },
        {
            companyName: "SportRetina", location: "Remote",
            date: "21st July 2023", time: "15:00pm",
            timezone: "Europe/London", status: 2
        },
        {
            companyName: "Computer Works", location: "Remote",
            date: "15th July 2023", time: "19:00pm",
            timezone: "Europe/Paris", status: 0
        },
    ]);
    const [usersJobs, setUsersJobs] = useState([]);
    const [upcomingJobs, setUpcomingJobs] = useState([]);
    const [finishedJobs, setFinishedJobs] = useState([]);
    const [todayJobs, setTodayJobs] = useState([]);

    const { user, error } = useAuth();

    useEffect(() => {
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

                console.log("usersJobs: ", appArray)
                let upcoming = [];
                let finished = [];
                let todayArr = [];
                let today = moment(new Date()).format("MM-DD-YYYY")
                appArray.map((app) => {
                    if (moment(app.interviewDate).isSame(today)) {
                        todayArr.push(app)
                    } else if (moment(app.interviewDate).isBefore(today)) {
                        finished.push(app)
                    } else {
                        upcoming.push(app)
                    }
                })

                setUpcomingJobs(upcoming)
                setFinishedJobs(finished)
                setTodayJobs(todayArr)
            }

        }
        getUsersJobs();
    }, [])

    useEffect(() => {
        var now = moment();
        console.log("NOW: ", now)
    }, [])

    return (
        <>
            <Header />
            <PageBanner page={"Interview Manager"} />
            <div className="tabs-container">
                <p
                    className={activeTab === 0 && 'active'}
                    onClick={() => setActiveTab(0)}
                >
                    All
                </p>
                <p
                    className={activeTab === 1 && 'active'}
                    onClick={() => setActiveTab(1)}
                >
                    Today
                </p>
                <p
                    className={activeTab === 2 && 'active'}
                    onClick={() => setActiveTab(2)}
                >
                    Upcoming
                </p>
                <p
                    className={activeTab === 3 && 'active'}
                    onClick={() => setActiveTab(3)}
                >
                    Finished
                </p>

            </div>


            {activeTab === 0 && (
                <div className="interview-container">
                    {usersJobs?.map((interview, index) => (
                        <Interview interview={interview} key={index} />
                    ))}
                </div>
            )}

            {activeTab === 1 && (
                <div className="interview-container">
                    {todayJobs?.map((interview, index) => (
                        <Interview interview={interview} key={index}/>
                    ))}
                </div>
            )}

            {activeTab === 2 && (
                <div className="interview-container">
                    {upcomingJobs?.map((interview, index) => (
                        <Interview interview={interview} key={index} />
                    ))}
                </div>
            )}
            
            {activeTab === 3 && (
                <div className="interview-container">
                    {finishedJobs?.map((interview, index) => (
                        <Interview interview={interview} key={index} />
                    ))}
                </div>
            )}


            {/* Content */}
            {/* <div className="interview-container">
                {interviews?.map((interview) => (
                    <Interview interview={interview} status={interview.status} />
                ))}
            </div> */}
        </>
    )
};

export default withProtected(Manager);