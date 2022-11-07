import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import useAuth from '../../hook/auth';
import { withProtected } from '../../hook/route';
import { arrayUnion, collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig';

import Header from '../../components/header';
import PageBanner from '../../components/pageBanner';
import Loading from '../../components/loading';
import LobbyJob from '../../components/lobbyJob';
import LobbyQueue from '../../components/lobbyQueue';
import Job from '../../components/job';
import CallingModal from '../../components/modals/callingModal';
import ReceivingModal from '../../components/modals/receivingModal';
import JoinModal from '../../components/modals/joinModal';


const Lobby = () => {
    const router = useRouter()
    const { id } = router.query
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [job, setJob] = useState({});

    const [active, setActive] = useState(false);
    const [active2, setActive2] = useState(false);
    const [active3, setActive3] = useState(false);


    const [callingUser, setCallingUser] = useState(null);

    const [queueList, setQueueList] = useState([

    ])



    useEffect(() => {
        const getJobFromFirebase = async () => {
            setLoading(true)
            const docRef = doc(db, "jobs", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // console.log("Document data:", docSnap.data());
                const { queue } = docSnap.data();
                setJob({ id: id, ...docSnap.data() })

                if (queue) {
                    setQueueList(queue);
                    console.log("Queue Exists");
                } else {
                    setQueueList([]);
                    console.log("Queue DOENST Exist");
                }

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
            setLoading(false);
        }
        getJobFromFirebase()
        const jobRef = doc(db, 'jobs', id);

        onSnapshot(doc(db, "jobs", id), async (doc) => {
            let { queue, userToCall } = doc.data();
            setQueueList(queue);
            // console.log("Updated document data: ", queue);

            if (userToCall && userToCall.id) {
                setCallingUser(userToCall.id)
                console.log("userToCall 5: ", userToCall);
                if (user.uid === userToCall.id) {
                    setActive2(true)
                }
                if (userToCall.accepted === true && user.uid === userToCall.hostId) {
                    console.log("USER JOINED INERVIEW ROOM")
                    console.log("User Id: ", user.uid)
                    setActive(false);
                    await setDoc(jobRef, { userToCall: { id: null, accepted: false, hostId: null } }, { merge: true });
                    router.push(`/room/${userToCall.hostId}/${userToCall.id}`)
                }
            } else {
                setActive2(false);
            }
        });

        router.events.on('routeChangeStart', async () => exitingFunction());



        return () => {
            router.events.off('routeChangeStart', exitingFunction);
        };
    }, [])

    const exitingFunction = async () => {
        console.log("LEAVING -------------------------");
        await removeFromQueue()

    }

    const removeFromQueue = async () => {
        // let queue = [...queueList];
        const jobRef = doc(db, "jobs", id);
        const docSnap = await getDoc(jobRef);
        if (docSnap.exists()) {
            const { queue } = docSnap.data();
            console.log("Current Queue: ", queue)
            if (queue) {
                let newQueue = queue?.filter(person => person.id !== user.uid);
                console.log("Filtered Queue: ", newQueue)
                await updateDoc(jobRef, {
                    queue: newQueue
                });
                setQueueList(newQueue);
            }
        } else {
            console.log("No such document!")
        }

    }

    useEffect(() => {
        console.log("Queue List: ", queueList);
    }, [queueList])


    const callUser = async (userToCall) => {
        setActive(true);
        // console.log("userToCall: ", userToCall)

        const jobRef = doc(db, 'jobs', id);
        const docSnap = await getDoc(jobRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            const { postedBy } = docSnap.data();
            console.log("POSTED BY: ", postedBy)

            await setDoc(jobRef, { userToCall: { id: userToCall, accepted: false, hostId: postedBy } }, { merge: true });

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }

    }

    useEffect(() => {
        console.log("Calling User changed")
    }, [callingUser])

    return (
        <>
            <Header />
            {callingUser}
            <PageBanner page={'Interview Lobby'} />
            <div className="lobby-container">
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        {/* <LobbyJob loading={loading} job={job} /> */}
                        <Job job={job} />
                        <LobbyQueue job={job} setJob={setJob} queueList={queueList} setQueueList={setQueueList} callUser={callUser} />
                    </>
                )}
            </div>
            <CallingModal active={active} setActive={setActive} id={id} />
            <ReceivingModal active2={active2} setActive2={setActive2} job={job} />
            <JoinModal active3={active3} setActive3={setActive3} />
        </>
    )
}

export default withProtected(Lobby);