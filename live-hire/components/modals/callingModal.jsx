import { doc, setDoc } from 'firebase/firestore';
import React from 'react';
import { db } from '../../firebaseConfig';
import Loader from './loader';

const CallingModal = ({ active, setActive, id }) => {

  const close = async () => {
    setActive(false);
    const jobRef = doc(db, 'jobs', id);
    await setDoc(jobRef, { userToCall: {} }, { merge: true });
  }
  return (
    <div class={active ? "modal is-active" : "modal"}>
      <div class="modal-background" onClick={close}></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <button class="delete" aria-label="close" onClick={close}></button>
        </header>
        <section class="modal-card-body">
          <h1>Calling User</h1>
          <h2>Please wait for them to accept</h2>
        </section>
        <footer class="modal-card-foot">
          <Loader />
        </footer>
      </div>
    </div>
  )
};

export default CallingModal;