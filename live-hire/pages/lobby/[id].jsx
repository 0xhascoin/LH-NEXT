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


const Lobby = () => {
    const router = useRouter()
    const { id } = router.query
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [job, setJob] = useState({});

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
        onSnapshot(doc(db, "jobs", id), (doc) => {
            let { queue } = doc.data();
            setQueueList(queue);
            // console.log("Updated document data: ", queue);
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

    // useEffect(() => {
    //     console.log("QUEUE LIST CHANGED")
    //     const getJobFromFirebase = async () => {
    //         setLoading(true)
    //         const docRef = doc(db, "jobs", id);
    //         const docSnap = await getDoc(docRef);

    //         if (docSnap.exists()) {
    //             console.log("Document data:", docSnap.data());

    //             setJob({ id: id, ...docSnap.data() })

    //         } else {
    //             // doc.data() will be undefined in this case
    //             console.log("No such document!");
    //         }
    //         setLoading(false);
    //     }
    //     getJobFromFirebase()
    // }, [queueList])

    return (
        <>
            <Header />
            <PageBanner page={'Interview Lobby'} />
            <div className="lobby-container">
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        {/* <LobbyJob loading={loading} job={job} /> */}
                        <Job job={job} />
                        <LobbyQueue job={job} setJob={setJob} queueList={queueList} setQueueList={setQueueList} />
                    </>
                )}
            </div>
        </>
    )
}

export default withProtected(Lobby);