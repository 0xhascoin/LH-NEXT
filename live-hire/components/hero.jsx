import { useRouter } from 'next/router';
import React from 'react';
import { wavy } from '../wavy.png'
import Search from './search';

const Hero = ({ displayJobs, setDisplayJobs, allJobs }) => {
  const router = useRouter();
  return (
    <>
      <div className="hero-container">
        <div className="hero-bg">
          <img src={'../wavy.png'} className="line1" />
          <img src={wavy} className="line2" />
          <img src={wavy} className="line3" />
        </div>
        <h2 className="hero-title">
          Find Your <span>Dream Job</span> Here <br />Easy & Fast
        </h2>
        <p className="hero-subtitle">
          The job hunting process can be long and tough... Live Hire is a platform
          where you can <br />
          apply and then interview all on the same platform, without any hassle & in less time
        </p>
        <p className="hero-subtitle">
          Trusted by over 80+ companies
        </p>
      </div>
      <div className="search-button">
        <button className="button" onClick={() => router.push("/jobs")}>View All Jobs</button>
      </div>
      <div className="browse-section">
        <h2>Browse Popular Jobs</h2>
        <p className="hero-subtitle">
          We have listed our top & demanded jobs according to our
          audience demand. <br />
          Popular jobs may change it depends on time & market.
        </p>
      </div>
    </>
  )
};

export default Hero;