import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import useAuth from '../hook/auth';

const EducationModal = ({
  showEducationModal,
  setShowEducationModal,
  educationList,
  setEducationList
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
    if (education.courseName !== "" || education.universityName !== "" ||
      education.from !== "" || education.till !== "") {
      let tempArr = [...educationList];
      tempArr.push(education)
      setEducationList(tempArr)
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { educationList: tempArr }, { merge: true });
      closeModal()
    } else {
      alert("Please fill in all values");
    }
  }

  return (
    <div class={showEducationModal ? "modal is-active" : "modal"}>
      <div class="modal-background" onClick={closeModal}></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add new education</p>
          <button class="delete" aria-label="close" onClick={closeModal}></button>
        </header>
        <section class="modal-card-body">

          <div class="field">
            <label class="label">Course Name</label>
            <div class="control">
              <input class="input" type="text"
                placeholder="Name of course completed"
                value={education.courseName}
                onChange={(e) => setEducation({ ...education, courseName: e.target.value })}
              />
            </div>
          </div>

          <div class="field">
            <label class="label">University / Organisation Name</label>
            <div class="control">
              <input class="input" type="text"
                placeholder="University name here"
                value={education.universityName}
                onChange={(e) => setEducation({ ...education, universityName: e.target.value })} />
            </div>
          </div>

          <div class="field">
            <label class="label">Start and end date</label>
            <div class="control dates">
              <input class="input" type="date" value={education.from} onChange={(e) => setEducation({ ...education, from: e.target.value })} />
              <input class="input" type="date" value={education.till} onChange={(e) => setEducation({ ...education, till: e.target.value })} />
            </div>
          </div>


        </section>
        <footer class="modal-card-foot">
          <button class="button is-success add is-small" onClick={addEducation}>Add Education</button>
          <button class="button is-small" onClick={closeModal}>Cancel</button>
        </footer>
      </div>
    </div>
  )
};

export default EducationModal;