import "./index.css";
import Review from "./components/review/Review";

function App() {
  return (
    <main>
      <section className="container">
        <div className="title">
          <h2>our views</h2>
          <div className="underline"></div>
        </div>
        <Review />
      </section>
    </main>
  );
}
export default App;
