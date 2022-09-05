import React from 'react';
import {wavy} from '../wavy.png'
import Search from './search';

const Hero = () => {
    return (
        <div className="hero-container">
        <div className="hero-bg">
          <img src={'../wavy.png'} className="line1" />
          <img src={wavy} className="line2" />
          <img src={wavy} className="line3" />
        </div>
        <h2 className="hero-title">
          Find Your <span>Dream Job</span> Here <br/>Easy & Fast
        </h2>
        <p className="hero-subtitle">
          Finding proper jobs in America can be tough... Jobify is a platform
          where you can <br />
          get your desired job without any hassle & in less time
        </p>
        <Search />
              <p className="hero-subtitle">
          Trusted by over 280+ companies
        </p>
      </div>
    )
};

export default Hero;