import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import { withProtected } from '../hook/route';
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { db, storage } from '../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';
import { arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const Post = ({ auth }) => {
    const [companyName, setCompanyName] = useState("");
    const [url, setUrl] = useState(null);
    const [companyDescription, setCompanyDescription] = useState("");
    const [file, setFile] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [jobs, setJobs] = useState([]);
    const { user } = auth;


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
                    setUrl(downloadURL)
                    console.log('File available at', downloadURL);
                });
            }
        );
    }

    const postJob = async () => {
        // Check the fields are not empty.
        if (companyName !== "" && companyDescription !== "" && url) {

            // Create the job object you want to add to the array
            const data = {
                companyName: companyName,
                companyDescription: companyDescription,
                companyLogo: url,
                postedBy: user.uid
            }

            // Get the ref of the job you are adding & create it in firebase
            const companyRef = doc(collection(db, "jobs"));
            await setDoc(companyRef, data);

            // Get the ref of the user in the users collection
            const userRef = doc(db, "users", user.uid);

            // Add the id of the company the user just posted to the jobs array field
            await updateDoc(userRef, {
                jobs: arrayUnion(companyRef.id)
            });

            // Reset all the form fields
            setSubmitted(true)
            resetFields();

        } else {
            // Fields are not enterred.
            alert("Complete all fields.")
        }
    }

    useEffect(() => {
        getUsersJobs();
    }, [])

    const getUsersJobs = async () => {
        const userRef = doc(db, "users", user.uid);
        const userData = await getDoc(userRef);
        const { jobs } = userData.data();
        const jobsArr = [];

        for(let i=0; i < jobs.length; i++) {
            const jobRef = doc(db, "jobs", jobs[i]);
            const jobData = await getDoc(jobRef);
            // jobsArr.push(jobData.data());
            console.log(jobData.data())
            jobsArr.push(jobData.data());
        }

        console.log(jobsArr);
        setJobs(jobsArr)


    }

    const resetFields = () => {
        setCompanyName("");
        setCompanyDescription("");
        setProgress(0);
        setUrl(null);
        setFile("");
    }

    return (
        <div className="post-page">
            <Header />
            {jobs.length ? jobs.map((job) => (
                <img src={job.companyLogo} height={96} width={96} />
            )) : (
                <h2>Loading...</h2>
            )}
            <div className="post-container">
                <div className="heading">
                    <h3>Create a job listing.</h3>
                    <h2>Make sure to fill in all fields.</h2>
                    <p>Fill the form below and let us know about your company. This information is required before posting a new job.</p>
                </div>
                <form className="form">
                    {submitted && <p className="has-text-primary">Submitted your company</p>}
                    <div class="field">
                        <label class="label">Company Name</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Your company name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Company Description</label>
                        <div class="control">
                            <textarea className="textarea" cols="30" rows="7" placeholder='Write a short description about the culture of your company' value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div class="field logo-field">
                        <div>
                            <label class="label">Upload your logo</label>
                            <div class="control">
                                <div class="file is-normal is-boxed">
                                    <label class="file-label">
                                        <input class="file-input" type="file" name="resume" onChange={fileUploaded} />
                                        <span class="file-cta has-text-centered">
                                            <span class="file-icon">
                                                <AiOutlineCloudUpload />
                                            </span>
                                            <span class="file-label">
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
                                    <img src={url} height={96} width={96} />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button" type="button" onClick={postJob}>Post job</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default withProtected(Post);