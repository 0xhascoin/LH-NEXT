import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";


import Header from '../components/header';
import Filters from '../components/filters';
import JobsGrid from '../components/jobsGrid';
import SearchResult from '../components/searchResult';
import Loading from '../components/loading';
import SearchBar from '../components/searchBar';

const Jobs = () => {
    const [allJobs, setAllJobs] = useState([]);
    const [displayJobs, setDisplayJobs] = useState([]);
    const [displayJobsCount, setDisplayJobsCount] = useState(null);
    const [loadingJobs, setLoadingJobs] = useState(false);

    const [searchText, setSearchText] = useState("");
    const [searchedText, setSearchedText] = useState("");


    useEffect(() => {
        const getAllJobsFromFirebase = async () => {
            setLoadingJobs(true)
            const q = query(collection(db, "jobs"));

            const querySnapshot = await getDocs(q);
            let tempArr = []
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                tempArr.push({ id: doc.id, ...doc.data() })
                console.log(doc.id, " => ", doc.data());
            });
            setAllJobs(tempArr);
            setDisplayJobs(tempArr);
            setDisplayJobsCount(tempArr.length)
            setLoadingJobs(false);
        }

        getAllJobsFromFirebase()
    }, []);


    return (
        <>
            <Header />
            <div className="columns find-jobs-page">
                {/* LEFT SIDE */}
                {/* FILTERS */}
                {/* JOB TYPE - FULL / PART TIME */}
                {/* JOB LEVEL - ENTRY / MID / SENIOR */}
                <div className="column left is-3">
                    <Filters 
                    searchText={searchText} 
                    setSearchText={setSearchText}
                    setSearchedText={setSearchedText}
                    allJobs={allJobs} 
                    displayJobs={displayJobs} 
                    setDisplayJobs={setDisplayJobs}
                    setDisplayJobsCount={setDisplayJobsCount} />
                </div>



                {/* RIGHT SIDE */}
                {/* SEARCH */}
                {/* RESULT TEXT */}
                {/* JOBS GRID */}
                {/* JOB COMPONENT */}
                <div className="column right">
                    <div className="search-bar-main-container">
                        <SearchBar 
                        searchedText={searchedText} 
                        setSearchedText={setSearchedText} 
                        searchText={searchText} 
                        setSearchText={setSearchText}
                        setDisplayJobs={setDisplayJobs}
                        allJobs={allJobs}
                        setDisplayJobsCount={setDisplayJobsCount} />
                    </div>
                    <div className="search-result-main-container">
                        <SearchResult 
                        displayJobsCount={displayJobsCount} 
                        searchText={searchText}
                        searchedText={searchedText} 
                        setSearchedText={setSearchedText}  />
                    </div>
                    {loadingJobs ? (
                        <Loading />
                    ) : (
                        <JobsGrid displayJobs={displayJobs} />
                    )}
                </div>

            </div>
        </>
    )
};

export default Jobs;