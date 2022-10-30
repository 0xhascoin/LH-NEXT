import React, { useState, useEffect } from 'react';

const SearchResult = ({ displayJobsCount, searchText, searchedText, setSearchedText }) => {
  
  return (
    <div className="search-result-container">
      {/* Result */}
        {/* Result count */}
        {/* Result text */}
      <div className="result-container">
        <div className="result-count">
          <p>Showing Results: {displayJobsCount}</p>
        </div>
        <div className="result-text">
          <p>{searchedText === "" ? 'All Jobs' : `${searchedText}`}</p>
        </div>
      </div>
      
    </div>
  )
};

export default SearchResult;