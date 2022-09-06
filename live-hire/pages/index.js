import Header from "../components/header";
import useAuth from "../hook/auth";
import { collection, query, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import Hero from "../components/hero";
import JobsList from "../components/jobsList";


const Home = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [displayJobs, setDisplayJobs] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const getAllJobsFromFirebase = async () => {
      const q = query(collection(db, "jobs"));

      const querySnapshot = await getDocs(q);
      let tempArr = []
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        tempArr.push({ id: doc.id, ...doc.data() })
        console.log(doc.id, " => ", doc.data());
      });
      setAllJobs(tempArr);
      setDisplayJobs(tempArr);
    }

    getAllJobsFromFirebase()
  }, []);

  useEffect(() => {
    console.log("DISPLAY JOBS: ", displayJobs);
  }, [displayJobs])



  return (
    <div className="home">
      <Header />
      {displayJobs.length && <Hero displayJobs={displayJobs} setDisplayJobs={setDisplayJobs} allJobs={allJobs} /> }
      {displayJobs.length ? <JobsList allJobs={displayJobs} /> : (
        <h2>Loading...</h2>
      )}
      
    </div>
  )
}

export default Home;
