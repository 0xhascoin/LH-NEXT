import React from 'react';
import {BsSearch} from 'react-icons/bs'

const Search = () => {
  return (
    <div className="search-container">
      <div className="icon-container">
        <BsSearch />
      </div>
      <input className="input" placeholder="Search" />
      <button className="button">Search</button>
    </div>
  )
};

export default Search;