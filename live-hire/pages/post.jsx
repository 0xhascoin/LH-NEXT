import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import JobPreviewModal from '../components/jobPreviewModal';
import { withProtected } from '../hook/route';
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { db, storage } from '../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import PostJobErrorModal from '../components/postJobErrorModal';
import PostJobSuccessModal from '../components/postJobSuccessModal';
import dynamic from "next/dynamic";
import {tz} from 'moment-timezone';
import moment from 'moment';

import { BiDetail } from 'react-icons/bi'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import SmallLoader from '../components/smallLoader';

const ReactQuill = dynamic(import('react-quill'), { ssr: false })

const LH_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAOxAAADsQBlSsOGwAABF9pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nPgo8cmRmOlJERiB4bWxuczpyZGY9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMnPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6QXR0cmliPSdodHRwOi8vbnMuYXR0cmlidXRpb24uY29tL2Fkcy8xLjAvJz4KICA8QXR0cmliOkFkcz4KICAgPHJkZjpTZXE+CiAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9J1Jlc291cmNlJz4KICAgICA8QXR0cmliOkNyZWF0ZWQ+MjAyMi0wNS0xNjwvQXR0cmliOkNyZWF0ZWQ+CiAgICAgPEF0dHJpYjpFeHRJZD4zYjAxMjVjNC1lYjc2LTQ0NjctODc1Mi05YTI5MWRiY2RhMTM8L0F0dHJpYjpFeHRJZD4KICAgICA8QXR0cmliOkZiSWQ+NTI1MjY1OTE0MTc5NTgwPC9BdHRyaWI6RmJJZD4KICAgICA8QXR0cmliOlRvdWNoVHlwZT4yPC9BdHRyaWI6VG91Y2hUeXBlPgogICAgPC9yZGY6bGk+CiAgIDwvcmRmOlNlcT4KICA8L0F0dHJpYjpBZHM+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOmRjPSdodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyc+CiAgPGRjOnRpdGxlPgogICA8cmRmOkFsdD4KICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+TDwvcmRmOmxpPgogICA8L3JkZjpBbHQ+CiAgPC9kYzp0aXRsZT4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRm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gg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAHPTT0A4EkdPHhwvP3222NjY2OsrPz565LPPvts3L17d4nLYDqCDuwZKysr48MPPxwffPDBWF1dfeLvf/nll4JOlqADe8Ynn3wy3nvvvalnwCz5DR3YE959910xh8cQdGBP2NnZmXoCzJqgA3vCG2+8MfUEmDVBB2Zv//79Y3t7e+oZMGuCDsze1tbW2Ldv39QzYNYEHZi9ra2tqSfA7Ak6MHsvv/zy1BNg9gQdmL3Nzc2pJ8DsCTowey+99NLUE2D2BB2YvY2NjaknwOwJOjB7R44cmXoCzJ6gA7Mn6PD/CTowe4cPH556AsyeoAOzd+jQoaknwOwJOjBrL7zwwnj++eenngGz533osId8+umn49GjR1PPeKb2798/9QTYEwQd9pB33nln6gnATAk6PAVHjx4di8VivPXWW1NPAf6hBB2e0NbW1lgsFmOxWIzTp0+PxWIxjh49OvUs4B9O0OExjh079odwLxYL/7gGZknQ4b9sbm6OCxcujJ2dnXHw4MGp5wD8KYIOv7O9vT0+//zz8eqrr049BeCJeA4dfufixYtiDuxJgg67Njc3x7lz56aeAfCXCDrsev3116eeAPCXCTrsWl1dnXoCwF8m6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABCwb319/dHUIwCAv8cVOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAT8B61bqNnBl6ngAAAAAElFTkSuQmCC";

const Post = ({ auth }) => {
    const [job, setJob] = useState({
        companyName: "",
        companyDescription: "",
        companyLogo: "",
        jobTitle: "",
        jobLevel: "",
        jobType: "",
        jobDescription: "",
        currency: "",
        jobSalary: "",
        interviewDate: "",
        interviewTime: "",
        timezone: tz.guess()

    })
    const [jobID, setJobID] = useState(null);
    const [companyDesc, setCompanyDesc] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [intDate, setIntDate] = useState("");
    const [file, setFile] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [progress, setProgress] = useState(null);
    const [jobs, setJobs] = useState([]);
    const { user } = auth;

    const [showPreview, setShowPreview] = useState(false);
    const [postJobError, setPostJobError] = useState(false);


    const fileUploaded = (event) => {
        setFile(event.target.files[0]);

        const storageRef = ref(storage, `/logos/${event.target.files[0].name}`);
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
                        setProgress(progress)
                        break;
                }
            },
            (error) => {
                console.log("Failed upload: ", error)
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setJob({ ...job, companyLogo: downloadURL })
                    console.log('File available at', downloadURL);
                });
            }
        );
    }

    const getDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        return today
    }

    const postJob = async () => {
        // Check the fields are not empty.
        console.log()
        if (job.companyName.length >= 3 && job.companyDescription.length > 50 && job.companyLogo !== "" &&
            job.jobTitle.length > 5 && job.jobLevel !== "" && job.jobType !== "" && job.jobSalary !== "" &&
            job.jobDescription.length > 100 && job.currency !== "" &&
            job.interviewDate !== "" && job.interviewTime !== "") {

            console.log("HERE1")

            // Create the job object you want to add to the array
            const data = {
                companyName: job.companyName,
                companyDescription: job.companyDescription,
                companyLogo: job.companyLogo,
                postedBy: user.uid,
                jobTitle: job.jobTitle,
                jobLevel: job.jobLevel,
                jobType: job.jobType,
                jobDescription: job.jobDescription,
                currency: job.currency,
                jobSalary: job.jobSalary,
                interviewDate: moment(job.interviewDate).format("MM-DD-YYYY"),
                interviewTime: job.interviewTime,
                timezone: job.timezone,
                postedDate: moment(new Date()).format("MM-DD-YYYY")
                
            }

            // Get the ref of the job you are adding & create it in firebase
            const companyRef = doc(collection(db, "jobs"));
            await setDoc(companyRef, data);


            // Get the ref of the user in the users collection
            const userRef = doc(db, "users", user.uid);

            setJobID(companyRef.id);


            // Add the id of the company the user just posted to the jobs array field
            await updateDoc(userRef, {
                jobs: arrayUnion(companyRef.id)
            });


            // await getUsersJobs(user);


            // Reset all the form fields
            setSubmitted(true)
            resetFields();


        } else {
            // Fields are not enterred.
            setPostJobError(true);
        }
    }



    const resetFields = () => {
        setJob({
            companyName: "",
            companyDescription: "",
            companyLogo: "",
            jobTitle: "",
            jobLevel: "",
            jobType: "",
            jobDescription: "",
            currency: "",
            jobSalary: 0,
            interviewDate: "",
            interviewTime: "",
        })
        setProgress(0);
        setFile("");
        setCompanyDesc("")
        setJobDesc("")
    }

    useEffect(() => {
        console.log("Company desc: ", companyDesc)
        setJob({ ...job, companyDescription: companyDesc })
    }, [companyDesc])
    useEffect(() => {
        console.log("Job desc: ", jobDesc)
        setJob({ ...job, jobDescription: jobDesc })
    }, [jobDesc])
    // useEffect(() => {
    //     if(job.interviewDate !== "") {
    //         let reverse = moment(job.interviewDate).format("MM-DD-YYYY")
    //         setIntDate(reverse)
    //         console.log("Interview date ", reverse)
    //     }

    // }, [job.interviewDate])


    return (
        <div className="post-page">
            <Header />
            <div className="post-container">
                <div className="post-heading">
                    <div className="company-logo">
                        <img src={LH_LOGO} />
                    </div>
                    <div className="heading-title">
                        <h2>Create a job listing</h2>
                        <p>Make sure to fill in all fields.</p>
                    </div>
                </div>
                <form className="form">
                    {submitted && <p className="has-text-primary">Submitted your company</p>}
                    <div className="field">
                        <label className="label">Company Name</label>
                        <div className="control has-icons-left">
                            <span className="icon is-small is-left">
                                <BiDetail />
                            </span>
                            <input className="input" type="text" placeholder="Your company name" value={job.companyName} onChange={(e) => setJob({ ...job, companyName: e.target.value })} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Company Description</label>
                        <div className="control">
                            <ReactQuill theme="snow" value={companyDesc} onChange={setCompanyDesc} />
                        </div>
                    </div>

                    <div className="field logo-field">
                        <div>
                            <label className="label">Upload your logo</label>
                            <div className="control">
                                <div className="file is-normal is-boxed">
                                    <label className="file-label">
                                        <input className="file-input" type="file" name="resume" onChange={fileUploaded} />
                                        <span className="file-cta has-text-centered">
                                            <span className="file-icon">
                                                <AiOutlineCloudUpload />
                                            </span>
                                            <span className="file-label">
                                                Click to upload file
                                            </span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            {progress == 100 && (
                                <div className="image-container has-text-centered">
                                    <h2>Your company logo</h2>
                                    <img src={job.companyLogo} height={96} width={96} />
                                </div>
                            )}
                            {progress !== null && progress !== 100 && (
                                <div className="image-container has-text-centered">
                                    <SmallLoader />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Job title</label>
                        <div className="control has-icons-left">
                            <span className="icon is-small is-left">
                                <BiDetail />
                            </span>
                            <input className="input" type="text" placeholder="Job title" value={job.jobTitle} onChange={(e) => setJob({ ...job, jobTitle: e.target.value })} />
                        </div>
                    </div>

                    <div className="field double">
                        <div className="job-type">
                            <label className="label">
                                Job Type
                            </label>
                            <div className="control has-icons-left">
                                <span className="icon is-small is-left">
                                    <BiDetail />
                                </span>
                                <div
                                    className="select is-normal"
                                >
                                    <select
                                        onChange={(e) =>
                                            setJob({ ...job, jobType: e.target.value })
                                        }
                                        value={job.jobType}

                                    >
                                        <option value="">Select from dropdown</option>
                                        <option value="Full Time">Full Time</option>
                                        <option value="Part Time">Part Time</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="job-level">
                            <label className="label">
                                Job level
                            </label>
                            <div className="control has-icons-left">
                                <span className="icon is-small is-left">
                                    <BiDetail />
                                </span>
                                <div
                                    className="select is-normal"
                                >
                                    <select
                                        onChange={(e) =>
                                            setJob({ ...job, jobLevel: e.target.value })
                                        }
                                        value={job.jobLevel}

                                    >
                                        <option value="">Select from dropdown</option>
                                        <option value="Junior">Junior</option>
                                        <option value="Mid">Mid-level</option>
                                        <option value="Senior">Senior</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Job Description</label>
                        <div className="control">
                            <ReactQuill theme="snow" value={jobDesc} onChange={setJobDesc} />
                        </div>
                    </div>

                    <div className="post-heading interview">

                        <div className="heading-title">
                            <h2>Compensation and Interview Details.</h2>
                            <p>Make sure to fill in all fields.</p>
                        </div>
                    </div>
                    <div className="field double">
                        <div className="job-type">
                            <label className="label">
                                Currency
                            </label>
                            <div className="control has-icons-left">
                                <span className="icon is-small is-left">
                                    <RiMoneyDollarCircleLine />
                                </span>
                                <div
                                    className="select is-normal"
                                >
                                    <select
                                        onChange={(e) =>
                                            setJob({ ...job, currency: e.target.value })
                                        }
                                        value={job.currency}

                                    >
                                        <option value="">Select currency from dropdown</option>
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                        <option value="AUD">AUD</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="job-level">
                            <label className="label">
                                Job Salary
                            </label>
                            <div className="control has-icons-left">
                                <span className="icon is-small is-left">
                                    <RiMoneyDollarCircleLine />
                                </span>
                                <input className="input" type="number" placeholder="30,000+" value={job.jobSalary} onChange={(e) => setJob({ ...job, jobSalary: e.target.value })} />
                            </div>
                        </div>
                    </div>
                    <div className="field double">
                        <div className="job-type">
                            <label className="label">
                                Interview date
                            </label>
                            <div className="control">
                                <input type="date" className="input" value={job.interviewDate} onChange={(e) => setJob({ ...job, interviewDate: e.target.value })} />
                            </div>
                        </div>

                        <div className="job-level">
                            <label className="label">
                                Interview time
                            </label>
                            <div className="control">
                                <input className="input" type="time" value={job.interviewTime} onChange={(e) => setJob({ ...job, interviewTime: e.target.value })} />
                            </div>
                        </div>
                    </div>
                    <div className="field buttons-field">
                        <div className="control">
                            <button className="button post" type="button" onClick={postJob}>Post job</button>
                        </div>
                        <div className="control">
                            <button className="button preview" type="button" onClick={() => setShowPreview(true)}>Preview job</button>
                        </div>
                    </div>
                </form>
            </div >
            {postJobError && <PostJobErrorModal job={job} postJobError={postJobError} setPostJobError={setPostJobError} />}
            {submitted && <PostJobSuccessModal job={job} submitted={submitted} setSubmitted={setSubmitted} id={jobID}/>}
            {showPreview && <JobPreviewModal selectedJob={job} setShowPreview={setShowPreview} showPreview={showPreview} />}
        </div >
    )
}

export default withProtected(Post);