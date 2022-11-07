import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React from 'react';
import { db } from '../../firebaseConfig';
import useAuth from '../../hook/auth';

const ReceivingModal = ({ active2, setActive2, job }) => {
  const { user } = useAuth();
  const router = useRouter();

   const close = () => {
    setActive2(false);
  }

  const joinRoom = async () => {
    const jobRef = doc(db, 'jobs', job.id);
    await setDoc(jobRef, { userToCall: {accepted: true} }, { merge: true });
    router.push(`/room/${job.postedBy}/${user.uid}`)
  }

  return (
    <div class={active2 ? "modal is-active" : "modal"}>
      <div class="modal-background" onClick={close}></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <button class="delete" aria-label="close" onClick={close}></button>
        </header>
        <section class="modal-card-body">
          <h1>Receiving a call</h1>
          <h2>Host is inviting you to start an interview</h2>
        </section>
        <footer class="modal-card-foot">
          <button className="accept-call button" onClick={joinRoom}>Join Interview</button>
        </footer>
      </div>
    </div>
  )
}
export default ReceivingModal;