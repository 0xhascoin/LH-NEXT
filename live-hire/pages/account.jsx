import { withProtected } from '../hook/route';
import React, { useState, useEffect } from 'react';

import { AiOutlineCloseCircle, AiOutlineFilePdf } from 'react-icons/ai'
import { BiCloudUpload } from 'react-icons/bi'

import Header from '../components/header';
import WorkExperienceModal from '../components/workExperienceModal';
import EducationModal from '../components/educationModal';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from '../firebaseConfig';
import useAuth from '../hook/auth';
import Loading from '../components/loading';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';



const Account = () => {
    const { user, error } = useAuth();

    const [userProfile, setUserProfile] = useState({
        userType: "job seeker",
        email: "",
        firstName: "",
        lastName: "",
        location: "",
        profileImage: null,
        resume: ""
    })
    const [skills, setSkills] = useState([
        "react", "javascript", "css", "html"
    ])
    const [skill, setSkill] = useState("");
    const [savingProfile, setSavingProfile] = useState(false);


    useEffect(() => {
        console.log("userProfile: ", userProfile)
    }, [userProfile])

    useEffect(() => {
        const getUserDetails = async () => {
            setSavingProfile(true);
            if (error === "" || error === undefined || user.uid !== null) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const { firstName, userType, email, lastName, location, profileImage, resume, skills, workExperienceList, educationList } = docSnap.data();
                    setUserProfile({
                        userType: userType ?? "job seeker",
                        email: email ?? "",
                        firstName: firstName ?? "",
                        lastName: lastName ?? "",
                        location: location ?? "",
                        profileImage: profileImage ?? null,
                        resume: resume ?? ""
                    })
                    setSkills(skills ?? [])
                    setWorkExperienceList(workExperienceList ?? [])
                    setEducationList(educationList ?? [])
                    setSavingProfile(false);

                } else {
                    console.log("No such document!");
                    setSavingProfile(false);
                }
            }
            setSavingProfile(false);
        }
        getUserDetails();
    }, [])

    const getUserDetails = async () => {
        setSavingProfile(true);
        if (error === "" || error === undefined || user.uid !== null) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const { firstName, userType, email, lastName, location, profileImage, resume, skills, workExperienceList, educationList } = docSnap.data();
                setUserProfile({
                    userType: userType ?? "job seeker",
                    email: email ?? "",
                    firstName: firstName ?? "",
                    lastName: lastName ?? "",
                    location: location ?? "",
                    profileImage: profileImage ?? null,
                    resume: resume ?? ""
                })
                setSkills(skills ?? [])
                setWorkExperienceList(workExperienceList ?? [])
                setEducationList(educationList ?? [])
                setSavingProfile(false);

            } else {
                console.log("No such document!");
                setSavingProfile(false);
            }
        }
        setSavingProfile(false);
    }

    const saveUserProfile = async () => {
        setSavingProfile(true);
        if (userProfile.userType !== "" && userProfile.email !== "" && userProfile.firstName !== "" &&
            userProfile.lastName !== "" && userProfile.location !== "") {
            // Save the new user profile
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, userProfile, { merge: true });
            await getUserDetails();
        } else {
            alert("Fill in all fields please.");
            setSavingProfile(false);
        }
    }


    const [workExperienceList, setWorkExperienceList] = useState([
        {
            companyName: "Facebook", jobTitle: "Software Engineer",
            from: "2020-10-12", till: "2022-10-12", shortDesc: "Hello there abc twent four seven"
        },
        {
            companyName: "Twitter", jobTitle: "Software Engineer",
            from: "2020-10-12", till: "2022-10-12", shortDesc: "Hello there abc twent four seven"
        },
    ])

    const [educationList, setEducationList] = useState([
        { courseName: "Computer Science", universityName: "DeMontfort University", from: "2020-10-12", till: "2022-10-12" }
    ])

    const [showWorkExperienceModal, setShowWorkExperienceModal] = useState(false);
    const [showEducationModal, setShowEducationModal] = useState(false);


    const toTitleCase = (str) => {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    const deleteExperience = async (exp) => {
        console.log("Experience to be deleted: ", exp);
        let tempArr = [...workExperienceList];
        tempArr = tempArr.filter(e => e.companyName.toLowerCase() !== exp.toLowerCase());
        console.log("Experience after delete: ", tempArr)
        setWorkExperienceList(tempArr);
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, { workExperienceList: tempArr }, { merge: true });
    }

    const deleteEducation = async (course) => {
        let tempArr = [...educationList];
        tempArr = tempArr.filter(e => e.courseName.toLowerCase() !== course.toLowerCase());
        setEducationList(tempArr);
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, { educationList: tempArr }, { merge: true });
    }


    const addSkill = async () => {
        if (skill === "") {
            alert("Enter a skill")
        } else {
            if (!skills.includes(skill.toLowerCase())) {
                let tempArr = [...skills];
                tempArr.push(skill.toLowerCase());
                setSkills(tempArr)
                setSkill("");
                const userRef = doc(db, 'users', user.uid);
                await setDoc(userRef, { skills: tempArr }, { merge: true });
                // await getUserDetails();
            } else {
                alert("Skill already added.")
            }
        }
    }

    const deleteSkill = async (skillName) => {
        let tempArr = [...skills]
        tempArr = tempArr.filter(e => e !== skillName);
        setSkills(tempArr)
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, { skills: tempArr }, { merge: true });
        // await getUserDetails();
    }


    const profileImageUploaded = async (event) => {

        const storageRef = ref(storage, `/profileimage/${event.target.files[0].name}`);
        const uploadTask = uploadBytesResumable(storageRef, event.target.files[0]);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        // setProgress(progress)
                        break;
                }
            },
            (error) => {
                console.log("Failed upload: ", error)
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    setUserProfile({ ...userProfile, profileImage: downloadURL })
                    const userRef = doc(db, 'users', user.uid);
                    await setDoc(userRef, {profileImage: downloadURL}, { merge: true });
                    console.log('File available at', downloadURL);
                });
            }
        );
    }




    return (
        <>
            <Header />
            {savingProfile ? <Loading /> : (
                <div className="accounts-page">
                    <div className="accounts-heading">
                        <h2>My Account</h2>
                    </div>
                    <div className="columns">

                        <div className="accounts-container column is-7">
                            <div className="heading">
                                <h2>User Information</h2>
                                <p>
                                    Enter the required information below to complete your profile.
                                    You can change it any time you want.
                                </p>
                            </div>
                            <div class="field user-type">
                                <label class="label">User type</label>
                                <div class="control">
                                    <button
                                        className={userProfile.userType === "job seeker" ?
                                            "button job-seeker selected" : "button job-seeker"}
                                        onClick={() => setUserProfile({ ...userProfile, userType: "job seeker" })}>
                                        Job Seeker
                                    </button>
                                    <button
                                        className={userProfile.userType === "employer" ?
                                            "button employer selected" : "button employer"}
                                        onClick={() => setUserProfile({ ...userProfile, userType: "employer" })}>
                                        Employer
                                    </button>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Email</label>
                                <div class="control">
                                    <input class="input" type="email" placeholder="hasanelmi678@gmail.com" value={userProfile.email}
                                        onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })} />
                                </div>
                            </div>
                            <div className="names-fields">
                                <div class="field">
                                    <label class="label">First Name</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Hasan"
                                            value={userProfile.firstName}
                                            onChange={(e) => setUserProfile({ ...userProfile, firstName: e.target.value })} />
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Last Name</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Elmi"
                                            value={userProfile.lastName}
                                            onChange={(e) => setUserProfile({ ...userProfile, lastName: e.target.value })} />
                                    </div>
                                </div>
                            </div>

                            <div className="field select-field">
                                <label className="label">Location</label>
                                <div class="select control">
                                    <select value={userProfile.location} onChange={(e) => setUserProfile({ ...userProfile, location: e.target.value })}>
                                        <option value="">Select your continent</option>
                                        <option value="africa">Africa</option>
                                        <option value="australia">Australia</option>
                                        <option value="asia">Asia</option>
                                        <option value="europe">Europe</option>
                                        <option value="south america">South America</option>
                                        <option value="united kingdom">United Kingdom</option>
                                        <option value="united states">United States</option>
                                    </select>
                                </div>
                            </div>

                            <div className="field skills-field">
                                <label className="label">Skills</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Skill" value={skill} onChange={(e) => setSkill(e.target.value)} />
                                </div>

                                <div class="control">
                                    <button className="button is-primary is-small is-outlined my-2"
                                        onClick={addSkill}>
                                        Add skill
                                    </button>
                                </div>

                                <div className="skills-list">
                                    {skills?.map((skill, index) => (

                                        <p
                                            className={index % 2 === 0 ? "tag is-warning is-light" : "tag is-link is-light"}
                                            onClick={() => deleteSkill(skill)}>
                                            <span>{toTitleCase(skill)}</span>
                                            <AiOutlineCloseCircle />
                                        </p>



                                    ))}
                                </div>
                            </div>


                            <div className="heading" style={{ marginTop: '40px' }}>
                                <h2>Work experience</h2>
                            </div>

                            {workExperienceList.map((experience) => (
                                <div className="experience-container">
                                    <div className="experience-fields">
                                        <p className="company-name">{experience.companyName}</p>
                                        <p className="job-title">{experience.jobTitle}</p>
                                        <p className="dates">{experience.from} - {experience.till}</p>
                                        <p className="desc">{experience.shortDesc}</p>
                                    </div>
                                    <button className="button is-danger is-small is-light is-outlined"
                                        onClick={() => deleteExperience(experience.companyName)}>X</button>
                                </div>
                            ))}

                            <button className="button is-primary is-light is-small is-outlined"
                                onClick={() => setShowWorkExperienceModal(true)}>
                                Add new work experience
                            </button>


                            <div className="heading" style={{ marginTop: '40px' }}>
                                <h2>Education or certifications</h2>
                            </div>

                            {educationList.map((education) => (
                                <div className="experience-container">
                                    <div className="experience-fields">
                                        <p className="company-name">{education.courseName}</p>
                                        <p className="job-title">{education.universityName}</p>
                                        <p className="dates">{education.from} - {education.till}</p>
                                    </div>
                                    <button className="button is-danger is-small is-light is-outlined"
                                        onClick={() => deleteEducation(education.courseName)}>X</button>
                                </div>
                            ))}

                            <button className="button is-primary is-light is-small is-outlined"
                                onClick={() => setShowEducationModal(true)}>
                                Add new education
                            </button>



                        </div>

                        <div className="column profile-section">
                            <div className="heading">
                                <h2>Profile Image</h2>
                            </div>

                            <div className="profile-image">
                                <img src={userProfile.profileImage ? userProfile.profileImage : "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"} />
                            </div>

                            <div className="image-upload">
                                <div class="file is-boxed">
                                    <label class="file-label">
                                        <input class="file-input" type="file" name="resume" onChange={profileImageUploaded} />
                                        <span class="file-cta">
                                            <span class="file-icon">
                                                <BiCloudUpload />
                                            </span>
                                            <span class="file-label">
                                                Choose a file…
                                            </span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className="resume-section">
                                <div className="heading">
                                    <h2>Resume Upload</h2>
                                </div>

                                <div className="profile-image">
                                    <div className="resume-preview">
                                        <AiOutlineFilePdf />
                                    </div>
                                </div>

                                <div className="image-upload">
                                    <div class="file is-boxed">
                                        <label class="file-label">
                                            <input class="file-input" type="file" name="resume" />
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <BiCloudUpload />
                                                </span>
                                                <span class="file-label">
                                                    Choose a file…
                                                </span>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                    {showWorkExperienceModal && (
                        <WorkExperienceModal showWorkExperienceModal={showWorkExperienceModal}
                            setShowWorkExperienceModal={setShowWorkExperienceModal}
                            workExperienceList={workExperienceList}
                            setWorkExperienceList={setWorkExperienceList}
                        />
                    )}
                    {showEducationModal && (
                        <EducationModal showEducationModal={showEducationModal}
                            setShowEducationModal={setShowEducationModal}
                            educationList={educationList}
                            setEducationList={setEducationList}
                        />
                    )}
                    <div className="save-changes">
                        <button className="button is-link is-outlined" onClick={saveUserProfile}>Save all changes</button>
                    </div>
                </div>
            )}
        </>

    )
};

export default withProtected(Account);