import React, { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs'
import { AiFillCloseCircle } from 'react-icons/ai'

const Search = ({ displayJobs, setDisplayJobs, allJobs }) => {
  const [searchText, setSearchText] = useState("");
  const [showClose, setShowClose] = useState(false);

  useEffect(() => {
    console.log("searchText: ", searchText);
    searchText !== "" ? setShowClose(true) : setShowClose(false);
  }, [searchText]);

  useEffect(() => {
    console.log("displayJobs: ", displayJobs);
  }, [])

  const clear = () => {
    setSearchText("");
    setDisplayJobs(allJobs);
  }

  const searchJobs = () => {
    if (searchText !== "") {
      let result = [];
      let filteredData = displayJobs.filter(function (job) {
        let title = job.jobTitle.toString();
        title.toLowerCase().includes(searchText.toLowerCase()) &&
          result.push(job);
      });

      console.log("Result: ", result);
      setDisplayJobs(result);
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

export default Search;