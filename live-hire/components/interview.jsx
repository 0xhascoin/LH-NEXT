import React, { useEffect, useState } from 'react';
import { GrLocation, GrGlobe, GrFormNextLink } from 'react-icons/gr';
import { BsBriefcase, BsCalendarDate } from 'react-icons/bs';
import { BiTimeFive } from 'react-icons/bi';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Interview = ({ interview }) => {
  const classToStatus = [
    ["Today", "tag is-primary is-light"],
    ["Finished", "tag is-danger is-light"],
    ["Upcoming", "tag is-info is-light"]
  ]
  const [status, setStatus] = useState(0)
  const router = useRouter()

  useEffect(() => {
    console.log("Interview Date: ", moment(interview.interviewDate).format('MMMM Do YYYY'));
    let today = moment(new Date()).format("MM-DD-YYYY")
    if (moment(interview.interviewDate).isSame(today)) {
      setStatus(0);
    } else if (moment(interview.interviewDate).isBefore(today)) {
      setStatus(1)
    } else {
      setStatus(2);
    }
  }, [])

  return (
    <div className="interview" onClick={() => router.push(`/lobby/${interview.id}`)}>
      <div className="job-title-container">
        <p>Frontend Developer</p>
        <span className={classToStatus[status][1]}>
          {classToStatus[status][0]}
        </span>
      </div>
      <div className="details-container">
        <div className="detail">
          <BsBriefcase />
          <p>{interview.companyName}</p>
        </div>
        <div className="detail">
          <GrLocation />
          <p>{interview.location}</p>
        </div>
        <div className="detail">
          <BsCalendarDate />
          <p>{moment(interview.interviewDate).format('MMMM Do YYYY')}</p>
        </div>
      </div>
      <div className="details-container">
        <div className="detail">
          <BiTimeFive />
          <p>{interview.interviewTime}</p>
        </div>
        <div className="detail">
          <GrGlobe />
          <p>{interview.timezone}</p>
        </div>
      </div>

      <div className="button-container">
        <button className="button">
          <span>Go to lobby</span>
          <span className="icon is-small">
            <GrFormNextLink />
          </span>
        </button>
      </div>
    </div>
  )
}

export default Interview;