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


const ReactQuill = dynamic(import('react-quill'), { ssr: false })


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

    })
    const [companyDesc, setCompanyDes] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [file, setFile] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [jobs, setJobs] = useState([]);
    const { user, usersJobs, getUsersJobs } = auth;

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
                interviewDate: job.interviewDate,
                interviewTime: job.interviewTime,
                postedDate: getDate()
            }

            // Get the ref of the job you are adding & create it in firebase
            const companyRef = doc(collection(db, "jobs"));
            await setDoc(companyRef, data);

            console.log("HERE2")

            // Get the ref of the user in the users collection
            const userRef = doc(db, "users", user.uid);

            console.log("HERE3")

            // Add the id of the company the user just posted to the jobs array field
            await updateDoc(userRef, {
                jobs: arrayUnion(companyRef.id)
            });

            console.log("HERE4")

            await getUsersJobs(user);

            console.log("HERE5")

            // Reset all the form fields
            setSubmitted(true)
            resetFields();

            console.log("HERE6")

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
    }

    useEffect(() => {
        console.log("Company desc: ", companyDesc)
        setJob({...job, companyDescription: companyDesc})
    }, [companyDesc])
    useEffect(() => {
        console.log("Job desc: ", jobDesc)
        setJob({...job, jobDescription: companyDesc})
    }, [jobDesc])


    return (
        <div className="post-page">
            <Header />
            <div className="post-container">
                <div className="heading">
                    <h3>Create a job listing.</h3>
                    <h2>Make sure to fill in all fields.</h2>
                    <p>Fill the form below and let us know about your company. This information is required before posting a new job.</p>
                </div>
                <form className="form">
                    {submitted && <p className="has-text-primary">Submitted your company</p>}
                    <div className="field">
                        <label className="label">Company Name</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Your company name" value={job.companyName} onChange={(e) => setJob({ ...job, companyName: e.target.value })} />
                        </div>
                    </div>
                    {/* <div className="field">
                        <label className="label">Company Description</label>
                        <div className="control">
                            <textarea className="textarea" cols="30" rows="7" placeholder='Write a short description about the culture of your company' value={job.companyDescription} onChange={(e) => setJob({ ...job, companyDescription: e.target.value })}></textarea>
                        </div>
                    </div> */}
                    <div className="field">
                        <label className="label">Company Description</label>
                        <div className="control">
                        <ReactQuill theme="snow" value={companyDesc} onChange={setCompanyDes} />
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
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Job title</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Job title" value={job.jobTitle} onChange={(e) => setJob({ ...job, jobTitle: e.target.value })} />
                        </div>
                    </div>
                    <div className="field double">
                        <div className="job-type">
                            <label className="label">
                                Job Type
                            </label>
                            <div className="control">
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
                            <div className="control">
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
                    {/* <div className="field">
                        <label className="label">Job Description</label>
                        <div className="control">
                            <textarea className="textarea" cols="30" rows="7" placeholder='Write a description about your requirements for this role' value={job.jobDescription} onChange={(e) => setJob({ ...job, jobDescription: e.target.value })}></textarea>
                        </div>
                    </div> */}
                    <div className="field">
                        <label className="label">Job Description</label>
                        <div className="control">
                        <ReactQuill theme="snow" value={jobDesc} onChange={setJobDesc} />
                        </div>
                    </div>
                    <hr />
                    <div className="heading mb-6">
                        <h3>Compensation and Interview Details.</h3>
                    </div>
                    <div className="field double">
                        <div className="job-type">
                            <label className="label">
                                Currency
                            </label>
                            <div className="control">
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
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="job-level">
                            <label className="label">
                                Job Salary
                            </label>
                            <div className="control">
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
            {submitted && <PostJobSuccessModal job={job} submitted={submitted} setSubmitted={setSubmitted} />}
            {showPreview && <JobPreviewModal selectedJob={job} setShowPreview={setShowPreview} showPreview={showPreview} />}
        </div >
    )
}

export default withProtected(Post);