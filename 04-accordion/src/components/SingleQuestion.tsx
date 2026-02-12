import { useState } from "react";
import type { Question } from "../types/questionType";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const SingleQuestion = ({ title, info }: Question) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <article className="question">
      <header>
        <h4>{title}</h4>
        <button className="btn" onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </header>
      {showInfo && <p>{info}</p>}
    </article>
  );
};
export default SingleQuestion;
