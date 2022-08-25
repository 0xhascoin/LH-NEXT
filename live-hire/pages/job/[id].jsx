import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig';
import Loading from '../../components/loading';

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

    if (loading) {
        return <Loading />
    }


    return (
        <div>Company name: {job?.companyName}</div>
    )
};

export default Job;