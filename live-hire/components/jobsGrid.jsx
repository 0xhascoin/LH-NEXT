import React, { useState } from 'react';

import Job from './job';

const JobsGrid = ({ displayJobs }) => {
  const [jobs, setJobs] = useState([
    {
    jobTitle: "Sr Front-end Developer",
    companyName: "Squarespace",
    companyLogo: "https://pbs.twimg.com/profile_images/1356606198435438595/4Nad8CDb_400x400.jpg",
    jobDescription: "Squarespace, Inc, is an American website building and hosting company which is based in New York City, United States.",
    jobLocation: "Remote",
    jobType: "Full-time",
    jobLevel: "Senior",
    posted: "5h ago",
    jobSalary: 2350000
  },
    {
    jobTitle: "Sr Front-end Developer",
    companyName: "Squarespace",
    companyLogo: "https://pbs.twimg.com/profile_images/1356606198435438595/4Nad8CDb_400x400.jpg",
    jobDescription: "Squarespace, Inc, is an American website building and hosting company which is based in New York City, United States.",
    jobLocation: "Remote",
    jobType: "Full-time",
    jobLevel: "Senior",
    posted: "5h ago",
    jobSalary: 2350000
  },
    {
    jobTitle: "Sr Front-end Developer",
    companyName: "Squarespace",
    companyLogo: "https://pbs.twimg.com/profile_images/1356606198435438595/4Nad8CDb_400x400.jpg",
    jobDescription: "Squarespace, Inc, is an American website building and hosting company which is based in New York City, United States.",
    jobLocation: "Remote",
    jobType: "Full-time",
    jobLevel: "Senior",
    posted: "5h ago",
    jobSalary: 2350000
  },
    {
    jobTitle: "Sr Front-end Developer",
    companyName: "Squarespace",
    companyLogo: "https://pbs.twimg.com/profile_images/1356606198435438595/4Nad8CDb_400x400.jpg",
    jobDescription: "Squarespace, Inc, is an American website building and hosting company which is based in New York City, United States.",
    jobLocation: "Remote",
    jobType: "Full-time",
    jobLevel: "Senior",
    posted: "5h ago",
    jobSalary: 2350000
  },
    {
    jobTitle: "Sr Front-end Developer",
    companyName: "Squarespace",
    companyLogo: "https://pbs.twimg.com/profile_images/1356606198435438595/4Nad8CDb_400x400.jpg",
    jobDescription: "Squarespace, Inc, is an American website building and hosting company which is based in New York City, United States.",
    jobLocation: "Remote",
    jobType: "Full-time",
    jobLevel: "Senior",
    posted: "5h ago",
    jobSalary: 2350000
  },
    {
    jobTitle: "Sr Front-end Developer",
    companyName: "Squarespace",
    companyLogo: "https://pbs.twimg.com/profile_images/1356606198435438595/4Nad8CDb_400x400.jpg",
    jobDescription: "Squarespace, Inc, is an American website building and hosting company which is based in New York City, United States.",
    jobLocation: "Remote",
    jobType: "Full-time",
    jobLevel: "Senior",
    posted: "5h ago",
    jobSalary: 2350000
  },
    {
    jobTitle: "Sr Front-end Developer",
    companyName: "Squarespace",
    companyLogo: "https://pbs.twimg.com/profile_images/1356606198435438595/4Nad8CDb_400x400.jpg",
    jobDescription: "Squarespace, Inc, is an American website building and hosting company which is based in New York City, United States.",
    jobLocation: "Remote",
    jobType: "Full-time",
    jobLevel: "Senior",
    posted: "5h ago",
    jobSalary: 2350000
  },
    {
    jobTitle: "Sr Front-end Developer",
    companyName: "Squarespace",
    companyLogo: "https://pbs.twimg.com/profile_images/1356606198435438595/4Nad8CDb_400x400.jpg",
    jobDescription: "Squarespace, Inc, is an American website building and hosting company which is based in New York City, United States.",
    jobLocation: "Remote",
    jobType: "Full-time",
    jobLevel: "Senior",
    posted: "5h ago",
    jobSalary: 2350000
  },
    {
    jobTitle: "Sr Front-end Developer",
    companyName: "Squarespace",
    companyLogo: "https://pbs.twimg.com/profile_images/1356606198435438595/4Nad8CDb_400x400.jpg",
    jobDescription: "Squarespace, Inc, is an American website building and hosting company which is based in New York City, United States.",
    jobLocation: "Remote",
    jobType: "Full-time",
    jobLevel: "Senior",
    posted: "5h ago",
    jobSalary: 2350000
  },
    {
    jobTitle: "Sr Front-end Developer",
    companyName: "Squarespace",
    companyLogo: "https://pbs.twimg.com/profile_images/1356606198435438595/4Nad8CDb_400x400.jpg",
    jobDescription: "Squarespace, Inc, is an American website building and hosting company which is based in New York City, United States.",
    jobLocation: "Remote",
    jobType: "Full-time",
    jobLevel: "Senior",
    posted: "5h ago",
    jobSalary: 2350000
  },
    {
    jobTitle: "Sr Front-end Developer",
    companyName: "Squarespace",
    companyLogo: "https://pbs.twimg.com/profile_images/1356606198435438595/4Nad8CDb_400x400.jpg",
    jobDescription: "Squarespace, Inc, is an American website building and hosting company which is based in New York City, United States.",
    jobLocation: "Remote",
    jobType: "Full-time",
    jobLevel: "Senior",
    posted: "5h ago",
    jobSalary: 2350000
  },
    {
    jobTitle: "Sr Front-end Developer",
    companyName: "Squarespace",
    companyLogo: "https://pbs.twimg.com/profile_images/1356606198435438595/4Nad8CDb_400x400.jpg",
    jobDescription: "Squarespace, Inc, is an American website building and hosting company which is based in New York City, United States.",
    jobLocation: "Remote",
    jobType: "Full-time",
    jobLevel: "Senior",
    posted: "5h ago",
    jobSalary: 2350000
  },
  ]);

  return (
    <div className="jobs-list-container">
      <div className="jobs-list">
        {displayJobs?.map((job, index) => (
          <Job job={job} key={index}/>
        ))}
      </div>
    </div>
  )
};

export default JobsGrid;