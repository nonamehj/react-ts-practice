import Tour from "./Tour";
import { type TourState } from "../../types/toursType";
type ToursProps = {
  tours: TourState[];
  removeTour: (id: string) => void;
};
const Tours = ({ tours, removeTour }: ToursProps) => {
  return (
    <section>
      <div className="title">
        <h2>our tours</h2>
        <div className="underline"></div>
      </div>
      <div>
        {tours.map((tour) => {
          return <Tour key={tour.id} {...tour} removeTour={removeTour} />;
        })}
      </div>
    </section>
  );
};
export default Tours;
