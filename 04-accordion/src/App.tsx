import "./index.css";
import { useState } from "react";
import data from "./data/data";
import SingleQuestion from "./components/SingleQuestion";

function App() {
  const [questions] = useState(data);
  return (
    <main>
      <div className="container">
        <h3>questions and answers about login</h3>
        <section className="info">
          {questions.map((question) => {
            return <SingleQuestion key={question.id} {...question} />;
          })}
        </section>
      </div>
    </main>
  );
}

export default App;
