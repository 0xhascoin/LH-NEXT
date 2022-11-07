import React from 'react';

const JoinModal = ({ active3, setActive3}) => {
  const close = () => {
    setActive3(false);
  }
  return (
    <div class={active3 ? "modal is-active" : "modal"}>
      <div class="modal-background" onClick={close}></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <button class="delete" aria-label="close" onClick={close}></button>
        </header>
        <section class="modal-card-body">
          <h1>User has accepted your call</h1>
          <h2>They are waiting for you to join the interview room</h2>
        </section>
        <footer class="modal-card-foot">
          <button className="accept-call button">Join Interview Room</button>
        </footer>
      </div>
    </div>
  )
}

export default JoinModal;