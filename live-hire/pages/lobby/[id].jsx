import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import useAuth from '../../hook/auth';
import { withProtected } from '../../hook/route';
import { arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig';

import Header from '../../components/header';
import PageBanner from '../../components/pageBanner';
import Loading from '../../components/loading';
import LobbyJob from '../../components/lobbyJob';
import LobbyQueue from '../../components/lobbyQueue';


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
        <>
        <Header />
        <PageBanner page={'Interview Lobby'} />
            <div className="lobby-container">
                {loading ? (
                     <Loading />
                     ) : (
                    <>
                        <LobbyJob loading={loading} job={job} />
                        <LobbyQueue job={job} queueList={queueList} setQueueList={setQueueList} />
                    </>
                )} 
            </div>
        </>
    )
}

export default withProtected(Lobby);