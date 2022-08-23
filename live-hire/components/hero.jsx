import React from 'react';

const Hero = () => {
    return (
        <div className="hero-container">
            <div className="heading">
                <h1>Stop sending <span>applications</span></h1> <br />
                <h1>Jump straight to <span>interviews</span></h1>
            </div>
            <div className="subheading">
                <h3>Tired of sending <span className="has-text-danger">application</span> after <span className="has-text-danger">application</span>?</h3> <br />
                <h3>We dont believe in that!</h3> <br />
                <h3>Jump straight to the interviews and <span className="has-text-primary">PROVE YOURSELF</span></h3>
            </div>
        </div>
    )
};

export default Hero;