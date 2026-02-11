import "./index.css";
import { useEffect, useState } from "react";
import Tours from "./components/tour/Tours";
import Loading from "./components/loading/Loading";
import type { TourState } from "./types/toursType";

const url = "/react-tours-project";

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState<TourState[]>([]);

  const fetchTours = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status : ${response.status}`);
      }
      const data: TourState[] = await response.json();
      // setLoading(false);
      setTours(data);
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error fetching tours", error.message);
      }
      console.log("Unknown error fetching tours");
      // setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const removeTour = (id: string) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  useEffect(() => {
    fetchTours();
  }, []);
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn" onClick={() => fetchTours()}>
            refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}
export default App;
