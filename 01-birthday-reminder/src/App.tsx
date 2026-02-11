import { useState } from "react";
import data from "./data/data";
import List from "./components/List";
import { type People } from "./types/people";

function App() {
  const [people, setPeople] = useState<People[]>(data);
  return (
    <main>
      <section className="container">
        <h3>{people.length} birthdays today</h3>
        <List people={people} />
        <button onClick={() => setPeople([])}>clear all</button>
      </section>
    </main>
  );
}
export default App;
