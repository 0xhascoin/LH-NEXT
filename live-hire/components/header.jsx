import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import useAuth from '../hook/auth';
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const LH_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAOxAAADsQBlSsOGwAABF9pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nPgo8cmRmOlJERiB4bWxuczpyZGY9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMnPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6QXR0cmliPSdodHRwOi8vbnMuYXR0cmlidXRpb24uY29tL2Fkcy8xLjAvJz4KICA8QXR0cmliOkFkcz4KICAgPHJkZjpTZXE+CiAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9J1Jlc291cmNlJz4KICAgICA8QXR0cmliOkNyZWF0ZWQ+MjAyMi0wNS0xNjwvQXR0cmliOkNyZWF0ZWQ+CiAgICAgPEF0dHJpYjpFeHRJZD4zYjAxMjVjNC1lYjc2LTQ0NjctODc1Mi05YTI5MWRiY2RhMTM8L0F0dHJpYjpFeHRJZD4KICAgICA8QXR0cmliOkZiSWQ+NTI1MjY1OTE0MTc5NTgwPC9BdHRyaWI6RmJJZD4KICAgICA8QXR0cmliOlRvdWNoVHlwZT4yPC9BdHRyaWI6VG91Y2hUeXBlPgogICAgPC9yZGY6bGk+CiAgIDwvcmRmOlNlcT4KICA8L0F0dHJpYjpBZHM+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOmRjPSdodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyc+CiAgPGRjOnRpdGxlPgogICA8cmRmOkFsdD4KICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+TDwvcmRmOmxpPgogICA8L3JkZjpBbHQ+CiAgPC9kYzp0aXRsZT4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRm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gg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAHPTT0A4EkdPHhwvP3222NjY2OsrPz565LPPvts3L17d4nLYDqCDuwZKysr48MPPxwffPDBWF1dfeLvf/nll4JOlqADe8Ynn3wy3nvvvalnwCz5DR3YE959910xh8cQdGBP2NnZmXoCzJqgA3vCG2+8MfUEmDVBB2Zv//79Y3t7e+oZMGuCDsze1tbW2Ldv39QzYNYEHZi9ra2tqSfA7Ak6MHsvv/zy1BNg9gQdmL3Nzc2pJ8DsCTowey+99NLUE2D2BB2YvY2NjaknwOwJOjB7R44cmXoCzJ6gA7Mn6PD/CTowe4cPH556AsyeoAOzd+jQoaknwOwJOjBrL7zwwnj++eenngGz533osId8+umn49GjR1PPeKb2798/9QTYEwQd9pB33nln6gnATAk6PAVHjx4di8VivPXWW1NPAf6hBB2e0NbW1lgsFmOxWIzTp0+PxWIxjh49OvUs4B9O0OExjh079odwLxYL/7gGZknQ4b9sbm6OCxcujJ2dnXHw4MGp5wD8KYIOv7O9vT0+//zz8eqrr049BeCJeA4dfufixYtiDuxJgg67Njc3x7lz56aeAfCXCDrsev3116eeAPCXCTrsWl1dnXoCwF8m6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABCwb319/dHUIwCAv8cVOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAT8B61bqNnBl6ngAAAAAElFTkSuQmCC";

const Header = () => {
    const { user, error, logout } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [jobsUploaded, setJobsUploaded] = useState(false);

    const toTitleCase = (str) => {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    useEffect(() => {

        const getUserDetails = async () => {
            console.log(user, "USER")
            if(user === null) return
            if (user !== null || error === "" || error === undefined) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const { jobs } = docSnap.data();
                    console.log("JOBS POSTED", jobs)
                    if (jobs !== undefined) {
                        setJobsUploaded(true);
                    }


                } else {
                    console.log("No such document!");
                }
            }
        }
        getUserDetails()
    }, [])

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link href={'/'}>
                    <a className="navbar-item">
                        <Image src={LH_LOGO} width={50} height={50} />
                        <span className="text">Live Hire</span>
                    </a>
                </Link>

                <a role="button" onClick={() => setShowMenu(!showMenu)} className={showMenu ? "navbar-burger is-active" : "navbar-burger"} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>


            <div id="navbarBasicExample" className={showMenu ? "navbar-menu is-active" : "navbar-menu"}>


                <div className="navbar-end">
                    <Link href={'/post'}>

                        <button className="button navbar-item post-job">Post job</button>
                    </Link>
                    <Link href={"/jobs"}>
                        <a className="navbar-item">
                            Find Jobs
                        </a>
                    </Link>
                    <a className="navbar-item">
                        How it works
                    </a>
                    {user === null ? (
                        <>

                            <Link href={"/login"}>
                                <a className="navbar-item">
                                    Login
                                </a>
                            </Link>
                            <Link href={"/signup"}>
                                <a className="navbar-item">
                                    Sign Up
                                </a>
                            </Link>
                        </>
                    ) : (
                        <div
                            className={
                                showDropdown
                                    ? "navbar-item dropdown is-active"
                                    : "navbar-item dropdown"
                            }
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <div className="dropdown-trigger">
                                <button
                                    className="button"
                                    aria-haspopup="true"
                                    aria-controls="dropdown-menu"
                                >
                                    <span className="first-letter">
                                        <p>{toTitleCase(user.email.slice(0, 1))}</p>
                                    </span>
                                    <span>{user.userName ? toTitleCase(user.username) : toTitleCase(user.email.slice(0, user.email.indexOf('@')))}</span>
                                    <span className="icon is-small">
                                        {showDropdown ? <AiFillCaretUp /> : <AiFillCaretDown />}
                                    </span>
                                </button>
                            </div>
                            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                <div className="dropdown-content">
                                    <Link href="/saved">
                                        <a className="dropdown-item">
                                            Saved jobs
                                        </a>
                                    </Link>
                                    <Link href="/manager">
                                        <a className="dropdown-item">
                                            Interview Manager
                                        </a>
                                    </Link>
                                    <Link href="/account" className="dropdown-item">
                                        <a className="dropdown-item">
                                            Update profile
                                        </a>
                                    </Link>
                                    {jobsUploaded && (
                                        <Link href="/applications" className="dropdown-item">
                                            <a className="dropdown-item">
                                                View applications
                                            </a>
                                        </Link>
                                    )}
                                    <a className="dropdown-item" onClick={logout}>
                                        Logout
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
};

export default Header;