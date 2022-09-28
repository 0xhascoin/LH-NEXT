import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import useAuth from '../hook/auth';

const WorkExperienceModal = ({ showWorkExperienceModal, setShowWorkExperienceModal, workExperienceList, setWorkExperienceList }) => {
  const [workExperience, setWorkExperience] = useState({
    companyName: "",
    jobTitle: "",
    from: "",
    till: "",
    shortDesc: ""
  });

  const { user, error } = useAuth();


  const closeModal = () => {
    setWorkExperience({
      companyName: "",
      jobTitle: "",
      from: "",
      till: "",
      shortDesc: ""
    })
    setShowWorkExperienceModal(false);
  }

  const addWorkExperience = async () => {
    if (workExperience.companyName !== "" || workExperience.jobTitle !== "" ||
      workExperience.from !== "" || workExperience.till !== "" ||
      workExperience.shortDesc !== "") {
      let tempArr = [...workExperienceList];
      tempArr.push(workExperience)
      setWorkExperienceList(tempArr)
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {workExperienceList: tempArr}, { merge: true });
      closeModal()
    } else {
      alert("Please fill in all values");
    }
  }

  return (
    <div class={showWorkExperienceModal ? "modal is-active" : "modal"}>
      <div class="modal-background" onClick={closeModal}></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add new work experience</p>
          <button class="delete" aria-label="close" onClick={closeModal}></button>
        </header>
        <section class="modal-card-body">

          <div class="field">
            <label class="label">Company Name</label>
            <div class="control">
              <input class="input" type="text"
                placeholder="Facebook, Twitter..."
                value={workExperience.companyName}
                onChange={(e) => setWorkExperience({ ...workExperience, companyName: e.target.value })}
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Job Title</label>
            <div class="control">
              <input class="input" type="text"
                placeholder="Software engineer, designer ..."
                value={workExperience.jobTitle}
                onChange={(e) => setWorkExperience({ ...workExperience, jobTitle: e.target.value })} />
            </div>
          </div>

          <div class="field">
            <label class="label">Start and end date</label>
            <div class="control dates">
              <input class="input" type="date" value={workExperience.from} onChange={(e) => setWorkExperience({ ...workExperience, from: e.target.value })} />
              <input class="input" type="date" value={workExperience.till} onChange={(e) => setWorkExperience({ ...workExperience, till: e.target.value })} />
            </div>
          </div>

          <div class="field">
            <label class="label">Short description of your time there</label>
            <div class="control">
              <textarea class="textarea" placeholder="Software engineer, designer ..."
                value={workExperience.shortDesc}
                onChange={(e) => setWorkExperience({ ...workExperience, shortDesc: e.target.value })} />
            </div>
          </div>

        </section>
        <footer class="modal-card-foot">
          <button class="button is-success add is-small" onClick={addWorkExperience}>Add Experience</button>
          <button class="button is-small" onClick={closeModal}>Cancel</button>
        </footer>
      </div>
    </div>
  )
};

export default WorkExperienceModal;