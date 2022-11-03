import Header from "../components/header";
import useAuth from "../hook/auth";
import { collection, query, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import Hero from "../components/hero";
import JobsGrid from "../components/jobsGrid";
import Job from "../components/job";
import Loading from "../components/loading";


const Home = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [displayJobs, setDisplayJobs] = useState([]);
  const [previewJobs, setPreviewJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const getAllJobsFromFirebase = async () => {
      setLoadingJobs(true)
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
      console.log("TEMP", tempArr.slice(0,6))
      setPreviewJobs(tempArr.slice(0,6))
      setLoadingJobs(false);
    }

    getAllJobsFromFirebase()
  }, []);

  useEffect(() => {
    console.log("DISPLAY JOBS: ", displayJobs);
  }, [displayJobs])



  return (
    <div className="home">
      <Header />
      {!loadingJobs && <Hero displayJobs={displayJobs} setDisplayJobs={setDisplayJobs} allJobs={allJobs} /> }
      {loadingJobs ? (
        <Loading />
      ) : (
        <JobsGrid displayJobs={previewJobs} />
      )}

      
    </div>
  )
}

export default Home;
