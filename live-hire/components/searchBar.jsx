import React, { useState, useEffect } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'

const SearchBar = ({ searchText, setSearchText, setSearchedText, searchedText, setDisplayJobs, allJobs, setDisplayJobsCount }) => {
  const [showClose, setShowClose] = useState(false);

  useEffect(() => {
    console.log("searchText: ", searchText);
    searchText !== "" ? setShowClose(true) : setShowClose(false);
  }, [searchText]);


  const clear = () => {
    setSearchText("");
    setSearchedText("");
    setDisplayJobs(allJobs);
    setDisplayJobsCount(allJobs.length);
  }

  const searchJobs = () => {
    if (searchText !== "") {
      let result = [];
      let filteredData = allJobs.filter(function (job) {
        let title = job.jobTitle.toString();
        title.toLowerCase().includes(searchText.toLowerCase()) &&
          result.push(job);
      });

      console.log("Result: ", result);
      setDisplayJobs(result);
      setDisplayJobsCount(result.length);
      setSearchedText(searchText)
    }
  }
  return (
    <div className="search-container">
      <div className="icon-container">
        <BsSearch />
      </div>
      <input className="input" placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      {showClose && (
        <div className="icon-container close" onClick={clear}>
          <AiFillCloseCircle />
        </div>
      )}
      <button className="button" onClick={searchJobs}>Search</button>
    </div>
  )
};

export default SearchBar;