import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React from 'react';
import { db } from '../../firebaseConfig';
import useAuth from '../../hook/auth';

const ReceivingModal = ({ active2, setActive2, job, setQueueList }) => {
  const { user } = useAuth();
  const router = useRouter();

   const close = async () => {
    setActive2(false);
    const jobRef = doc(db, 'jobs', job.id);
    await setDoc(jobRef, { userToCall: {} }, { merge: true });
  }

  const joinRoom = async () => {
    const jobRef = doc(db, 'jobs', job.id);

    console.log(user.uid);
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
    await setDoc(jobRef, { userToCall: {accepted: true} }, { merge: true });
    router.push(`/room/${job.postedBy}/${user.uid}`)
  }

  return (
    <div className={active2 ? "modal is-active" : "modal"}>
      <div className="modal-background" onClick={close}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <button className="delete" aria-label="close" onClick={close}></button>
        </header>
        <section className="modal-card-body">
          <h1>Receiving a call</h1>
          <h2>Host is inviting you to start an interview</h2>
        </section>
        <footer className="modal-card-foot">
          <button className="accept-call button" onClick={joinRoom}>Join Interview</button>
        </footer>
      </div>
    </div>
  )
}
export default ReceivingModal;