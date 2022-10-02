import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import useAuth from '../hook/auth';

const EducationModal = ({
  showEducationModal,
  setShowEducationModal,
  educationList,
  setEducationList,
  setErrorMessage,
  setShowAccountErrorModal
}) => {

  const [education, setEducation] = useState({
    courseName: "",
    universityName: "",
    from: "",
    till: "",
  })

  const { user, error } = useAuth();

  const closeModal = () => {
    setEducation({
      courseName: "",
      universityName: "",
      from: "",
      till: "",
    })
    setShowEducationModal(false);
  }

  const addEducation = async () => {
    if (education.courseName !== "" && education.universityName !== "" &&
      education.from !== "" && education.till !== "") {
      let tempArr = [...educationList];
      tempArr.push(education)
      setEducationList(tempArr)
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { educationList: tempArr }, { merge: true });
      closeModal()
    } else {
      // alert("Please fill in all values");
      setErrorMessage("Please fill in all values for education details.");
      setShowAccountErrorModal(true);
    }
  }

  return (
    <div className={showEducationModal ? "modal is-active" : "modal"}>
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add new education</p>
          <button className="delete" aria-label="close" onClick={closeModal}></button>
        </header>
        <section className="modal-card-body">

          <div className="field">
            <label className="label">Course Name</label>
            <div className="control">
              <input className="input" type="text"
                placeholder="Name of course completed"
                value={education.courseName}
                onChange={(e) => setEducation({ ...education, courseName: e.target.value })}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">University / Organisation Name</label>
            <div className="control">
              <input className="input" type="text"
                placeholder="University name here"
                value={education.universityName}
                onChange={(e) => setEducation({ ...education, universityName: e.target.value })} />
            </div>
          </div>

          <div className="field">
            <label className="label">Start and end date</label>
            <div className="control dates">
              <input className="input" type="date" value={education.from} onChange={(e) => setEducation({ ...education, from: e.target.value })} />
              <input className="input" type="date" value={education.till} onChange={(e) => setEducation({ ...education, till: e.target.value })} />
            </div>
          </div>


        </section>
        <footer className="modal-card-foot">
          <button className="button is-success add is-small" onClick={addEducation}>Add Education</button>
          <button className="button is-small" onClick={closeModal}>Cancel</button>
        </footer>
      </div>
    </div>
  )
};

export default EducationModal;