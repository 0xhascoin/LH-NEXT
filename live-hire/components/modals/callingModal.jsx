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
    <div className={active ? "modal is-active" : "modal"}>
      <div className="modal-background" onClick={close}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <button className="delete" aria-label="close" onClick={close}></button>
        </header>
        <section className="modal-card-body">
          <h1>Calling User</h1>
          <h2>Please wait for them to accept</h2>
        </section>
        <footer className="modal-card-foot">
          <Loader />
        </footer>
      </div>
    </div>
  )
};

export default CallingModal;