import React, { useState, useEffect } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'

const Filters = ({ searchText, allJobs, displayJobs, setDisplayJobs, setDisplayJobsCount, setSearchText, setSearchedText }) => {
  const [jobTypeFilter, setJobTypeFilter] = useState([]);
  const [jobLevelFilter, setJobLevelFilter] = useState([]);
  
  const [showFilters, setShowFilters] = useState(true);
  const [showJobTypeFilter, setShowJobTypeFilter] = useState(true);
  const [showJobLevelFilter, setShowJobLevelFilter] = useState(true);
  

  const addJobTypeFilter = (filter) => {
    let tempFilters = [...jobTypeFilter];
    if(jobTypeFilter.includes(filter)) {
      let newFilters = tempFilters.filter(a => a !== filter)
      setJobTypeFilter(newFilters)
      console.log(newFilters)
      console.log("-------")
    } else {
      tempFilters.push(filter)
      setJobTypeFilter(tempFilters);
      console.log(tempFilters)
      console.log("*******")
    }
  }

  const addJobLevelFilter = (filter) => {
    let tempFilters = [...jobLevelFilter];
    if(jobLevelFilter.includes(filter)) {
      let newFilters = tempFilters.filter(a => a !== filter)
      setJobLevelFilter(newFilters)
      console.log(newFilters)
      console.log("-------")
    } else {
      tempFilters.push(filter)
      setJobLevelFilter(tempFilters);
      console.log(tempFilters)
      console.log("*******")
    }
  }

  // useEffect(() => {
  //   console.log("Job Level Filters: ", jobLevelFilter)
  //   console.log("Job Type Filters: ", jobTypeFilter)
  // }, [jobTypeFilter, jobLevelFilter])


  const searchJobFilters = () => {
    console.log("Display Jobs: ", displayJobs);
    console.log("Job Type Filters: ", jobTypeFilter);
    console.log("Job Level Filters: ", jobLevelFilter);


    let tempJobs = [...allJobs];
    let resultArr = [];
    let finalArr = [];
    let allArr = [];

    if(jobTypeFilter.length !== 0) {
      for(let filter of jobTypeFilter) {
        console.log("Type Filter: ", filter);
        resultArr = tempJobs.filter(job => job.jobType === filter);
        if(resultArr.length !== 0) {
          for(let result of resultArr) {
            finalArr.push(result);
          }
        }
      }
    } else {
      finalArr = [...tempJobs]
    }

    console.log("Final Arr: ", finalArr);

    if(jobLevelFilter.length !== 0) {
      for(let filter of jobLevelFilter) {
        console.log("Level Filter: ", filter);
        console.log("Final Arr 1: ", finalArr);
        let arr = finalArr.filter(job => job.jobLevel === filter);
        console.log("Result Arr 1: ", arr);
        if(arr.length !== 0) {
          for(let result of arr) {
            allArr.push(result);
            console.log("Result: ", result)
          }
        }
      }
    } else {
      allArr = [...finalArr]
    }

    
    if(jobTypeFilter.length === 0 && jobLevelFilter.length === 0 ) {
      allArr = [...tempJobs];
    } 
    console.log("--- All Arr: ", allArr);

    // console.log("All Filters Arr: ", allArr);
    setDisplayJobs(allArr);
    setDisplayJobsCount(allArr.length);



  }

  const clearFilters = () => {
    setDisplayJobs(allJobs);
    setDisplayJobsCount(allJobs.length);
    setJobTypeFilter([])
    setJobLevelFilter([])
    setSearchText("")
    setSearchedText("")
  }


  
  return (
    <div className="filters-container">
      {/* Filter Title */}
      <div className="filters-heading"
        onClick={() => setShowFilters(!showFilters)}>
        <h1>Filters</h1>
        {showFilters ? (
            <AiFillCaretUp />
          ) : (
            <AiFillCaretDown />
        )}
      </div>
      {showFilters && (
      <>
        {/* Job Type Filter */}
        <div className="filter-container">
          <div className="filter-heading" 
            onClick={() => setShowJobTypeFilter(!showJobTypeFilter)}>
            <h1>Job Type</h1>
            {showJobTypeFilter ? (
              <AiFillCaretUp />
            ) : (
              <AiFillCaretDown />
            )}
          </div>
          {showJobTypeFilter && (
            <div className="filters-list">
              <div className="filter">
                <label class="checkbox">
                  <input type="checkbox" checked={jobTypeFilter.includes("Full Time") ? true : false} onClick={() => addJobTypeFilter("Full Time")} />
                  Full Time
                </label>
              </div>
              <div className="filter">
                <label class="checkbox">
                  <input type="checkbox" checked={jobTypeFilter.includes("Part Time") ? true : false} onClick={() => addJobTypeFilter("Part Time")} />
                  Part Time
                </label>
              </div>
            </div>
          )}
          
        </div>
        {/* Job Level Filter */}
        <div className="filter-container">
          <div className="filter-heading"
            onClick={() => setShowJobLevelFilter(!showJobLevelFilter)}>
            <h1>Job Level</h1>
            {showJobLevelFilter ? (
              <AiFillCaretUp />
            ) : (
              <AiFillCaretDown />
            )}
          </div>
          {showJobLevelFilter && (
            <div className="filters-list">
              <div className="filter">
                <label class="checkbox">
                  <input type="checkbox" checked={jobLevelFilter.includes("Junior") ? true : false} onClick={() => addJobLevelFilter("Junior")}/>
                  Junior Level
                </label>
              </div>
              <div className="filter">
                <label class="checkbox">
                  <input type="checkbox" checked={jobLevelFilter.includes("Mid") ? true : false} onClick={() => addJobLevelFilter("Mid")} />
                  Mid-level
                </label>
              </div>
              <div className="filter">
                <label class="checkbox">
                  <input type="checkbox" checked={jobLevelFilter.includes("Senior") ? true : false} onClick={() => addJobLevelFilter("Senior")} />
                  Senior Level
                </label>
              </div>
            </div>
          )}
        </div>
        <button className="button submit-button" onClick={searchJobFilters}>Search</button>
        <button className="button clear-button" onClick={clearFilters}>Clear</button>
          </>
      )}
    </div>
  )
};

export default Filters;