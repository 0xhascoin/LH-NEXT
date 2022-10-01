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
    <div className={showWorkExperienceModal ? "modal is-active" : "modal"}>
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add new work experience</p>
          <button className="delete" aria-label="close" onClick={closeModal}></button>
        </header>
        <section className="modal-card-body">

          <div className="field">
            <label className="label">Company Name</label>
            <div className="control">
              <input className="input" type="text"
                placeholder="Facebook, Twitter..."
                value={workExperience.companyName}
                onChange={(e) => setWorkExperience({ ...workExperience, companyName: e.target.value })}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Job Title</label>
            <div className="control">
              <input className="input" type="text"
                placeholder="Software engineer, designer ..."
                value={workExperience.jobTitle}
                onChange={(e) => setWorkExperience({ ...workExperience, jobTitle: e.target.value })} />
            </div>
          </div>

          <div className="field">
            <label className="label">Start and end date</label>
            <div className="control dates">
              <input className="input" type="date" value={workExperience.from} onChange={(e) => setWorkExperience({ ...workExperience, from: e.target.value })} />
              <input className="input" type="date" value={workExperience.till} onChange={(e) => setWorkExperience({ ...workExperience, till: e.target.value })} />
            </div>
          </div>

          <div className="field">
            <label className="label">Short description of your time there</label>
            <div className="control">
              <textarea className="textarea" placeholder="Software engineer, designer ..."
                value={workExperience.shortDesc}
                onChange={(e) => setWorkExperience({ ...workExperience, shortDesc: e.target.value })} />
            </div>
          </div>

        </section>
        <footer className="modal-card-foot">
          <button className="button is-success add is-small" onClick={addWorkExperience}>Add Experience</button>
          <button className="button is-small" onClick={closeModal}>Cancel</button>
        </footer>
      </div>
    </div>
  )
};

export default WorkExperienceModal;