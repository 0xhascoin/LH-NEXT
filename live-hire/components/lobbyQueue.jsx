import { doc, getDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import useAuth from '../hook/auth';

const profile = "https://infoinspired.com/wp-content/uploads/2013/12/Full-Size-WhatsApp-Profile-Pic-Squre_Round.jpg"
const profile2 = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/768px-Facebook_Logo_%282019%29.png"

const LobbyQueue = ({ job, queueList, setQueueList }) => {
    const [showJoin, setShowJoin] = useState(true);
    const [userProfile, setUserProfile] = useState({});
    const { user, error } = useAuth();

    const joinQueue = async () => {
        await getUserDetails();
        setShowJoin(false);
        let queue = [...queueList];
        queue.push(userProfile);
        setQueueList(queue)
    }

    useEffect(() => {
        const getUserDetails = async () => {
            if (user === null) return
            if (error === "" || error === undefined || user.uid !== null) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
    
                if (docSnap.exists()) {
                    const { firstName, userType, email, lastName, location, profileImage } = docSnap.data();
                    setUserProfile({
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
    }, [])

    const getUserDetails = async () => {
        if (user === null) return
        if (error === "" || error === undefined || user.uid !== null) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const { firstName, userType, email, lastName, location, profileImage } = docSnap.data();
                setUserProfile({
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
            <div className="control-buttons">
                {showJoin ? (
                    <button className="button is-primary"
                        onClick={joinQueue}>
                        Join Queue
                    </button>
                ) : (
                    <button className="button is-danger"
                        onClick={() => setShowJoin(true)}>
                        Leave Queue
                    </button>
                )}
            </div>
            <table class="queue-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Status</th>

                    </tr>
                </thead>
                <tbody>
                    {queueList.map((person) => (
                        <tr>
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
                                    <button className="button is-primary is-light">
                                        Call
                                    </button>
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