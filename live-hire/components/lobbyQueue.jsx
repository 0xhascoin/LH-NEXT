import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import useAuth from '../hook/auth';

const profile = "https://infoinspired.com/wp-content/uploads/2013/12/Full-Size-WhatsApp-Profile-Pic-Squre_Round.jpg"
const profile2 = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/768px-Facebook_Logo_%282019%29.png"

const LobbyQueue = ({ job, setJob, queueList, setQueueList }) => {
    const [showJoin, setShowJoin] = useState(true);
    const [hostID, setHostID] = useState(null);
    const [userProfile, setUserProfile] = useState({});
    const { user, error } = useAuth();

    const joinQueue = async () => {
        await getUserDetails();
        const jobRef = doc(db, "jobs", job.id);
        console.log("Queue List: ", queueList)
        let queue = [...queueList];
        queue.push(userProfile);
        await updateDoc(jobRef, {
            queue: queue
        });
        setQueueList(queue)

        setShowJoin(false);
    }

    console.log("JOB DETAILS: ", job);



    const leaveQueue = async (userToRemove) => {
        await getUserDetails();
        let queue = [...queueList];
        queue = queue.filter(person => person.id !== userToRemove.id);
        const jobRef = doc(db, "jobs", job.id);
        await updateDoc(jobRef, {
            queue: queue
        });
        setQueueList(queue);
        setShowJoin(true);
    }

    useEffect(() => {
        console.log("Queue LOADED: ", queueList)
        if(queueList === undefined) setQueueList([]);
    }, [])

    useEffect(() => {
        if (job) {
            setHostID(job.postedBy)
        }
        const getUserDetails = async () => {
            if (user === null) return
            if (error === "" || error === undefined || user.uid !== null) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const { firstName, userType, email, lastName, location, profileImage } = docSnap.data();
                    setUserProfile({
                        id: user.uid,
                        userType: userType ?? "job seeker",
                        email: email ?? "",
                        firstName: firstName ?? "",
                        lastName: lastName ?? "",
                        location: location ?? "",
                        profileImage: profileImage ?? null,
                    })

                } else {
                    console.log("No such document!");
                }
            }

        }
        getUserDetails()
        console.log("Job.Queue: ", job.queue)
        if (job.queue) {
            job?.queue?.map((person) => {
                if (person.id === user.uid) {
                    console.log("USER IN QUEUE")
                    setShowJoin(false);
                }
            })
        }

    }, [])


    const getUserDetails = async () => {
        if (user === null) return
        if (error === "" || error === undefined || user.uid !== null) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const { firstName, userType, email, lastName, location, profileImage } = docSnap.data();
                setUserProfile({
                    id: user.uid,
                    userType: userType ?? "job seeker",
                    email: email ?? "",
                    firstName: firstName ?? "",
                    lastName: lastName ?? "",
                    location: location ?? "",
                    profileImage: profileImage ?? null,
                })



            } else {
                console.log("No such document!");
            }
        }
    }


    return (
        <div className="queue">
            <div className="heading">
                <h1>Queue</h1>
            </div>
            {hostID !== user.uid && (

                <div className="control-buttons">
                    {showJoin ? (
                        <button className="button is-primary"
                            onClick={joinQueue}>
                            Join Queue
                        </button>
                    ) : (
                        <button className="button is-danger"
                            onClick={() => leaveQueue(userProfile)}>
                            Leave Queue
                        </button>
                    )}
                </div>
            )}
            <table className="queue-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Status</th>

                    </tr>
                </thead>
                <tbody>
                    {queueList?.map((person, index) => (
                        <tr key={index}>
                            <td>
                                <div className="name">
                                    <img src={person.profileImage} />
                                    <p>{person.firstName ? `${person.firstName} ${person.lastName}` :
                                        person.email}</p>
                                </div>
                            </td>
                            <td>
                                <div className="location">
                                    {person.location}
                                </div>
                            </td>
                            <td>
                                <div className="call-buttons">
                                {hostID === user.uid ? (
                                
                                    <button className="button is-primary is-light">
                                        Call
                                    </button>
                                ) : (
                                    <p>Waiting....</p>
                                )}
                                </div>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
};

export default LobbyQueue;