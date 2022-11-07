import React from 'react';

const JoinModal = ({ active3, setActive3}) => {
  const close = () => {
    setActive3(false);
  }
  return (
    <div className={active3 ? "modal is-active" : "modal"}>
      <div className="modal-background" onClick={close}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <button className="delete" aria-label="close" onClick={close}></button>
        </header>
        <section className="modal-card-body">
          <h1>User has accepted your call</h1>
          <h2>They are waiting for you to join the interview room</h2>
        </section>
        <footer className="modal-card-foot">
          <button className="accept-call button">Join Interview Room</button>
        </footer>
      </div>
    </div>
  )
}

export default JoinModal;