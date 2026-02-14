import { FaAngleDoubleRight } from "react-icons/fa";
import "./index.css";
import { useEffect, useState } from "react";
import { jobSchema, type Job } from "./schemas/job.schema";
// interface Job {
//   company: string;
//   dates: string;
//   duties: string[];
//   title: string;
//   id: string;
// }
const url = "react-tabs-project";
function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [value, setValue] = useState(0);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status : ${response.status}`);
      }
      const rawData: Job[] = await response.json();
      const result = jobSchema.array().safeParse(rawData);
      if (!result.success) {
        throw new Error(`Zod validation failed`);
      }
      setJobs(result.data);
    } catch (error) {
      if (error instanceof Error) {
        console.log("Fetch or validation error", error.message);
      }
      console.log("Unknown error fetching jobs");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    );
  }

  const { company, title, duties, dates } = jobs[value];
  return (
    <section className="section">
      <div className="title">
        <h2>experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        <div className="btn-container">
          {jobs.map((item, index) => {
            return (
              <button
                key={item.id}
                className={`job-btn ${index === value && "active-btn"}`}
                onClick={() => setValue(index)}
              >
                {item.company}
              </button>
            );
          })}
        </div>
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className="job-icon" />
                <p> {duty}</p>
              </div>
            );
          })}
        </article>
      </div>
      <button className="btn">more info</button>
    </section>
  );
}
export default App;
