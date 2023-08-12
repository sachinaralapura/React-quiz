import { useEffect, useState } from "react";
import "./app.css";
import QandA from "./component/QandA";
import axios from "axios";
const amountPyramid = [
  {
    id: 14,
    amount: "₹ 5 crore",
  },
  {
    id: 13,
    amount: "₹ 3 crore",
  },
  {
    id: 12,
    amount: "₹ 1 crore",
  },
  {
    id: 11,
    amount: "₹ 50,00,000",
  },
  {
    id: 10,
    amount: "₹ 25,00,000",
  },
  {
    id: 9,
    amount: "₹ 12,50,000",
  },
  {
    id: 8,
    amount: "₹ 6,40,000",
  },
  {
    id: 7,
    amount: "₹ 3,20,000",
  },
  {
    id: 6,
    amount: "₹ 1,60,000",
  },
  {
    id: 5,
    amount: "₹ 80,000",
  },
  {
    id: 4,
    amount: "₹ 40,000",
  },
  {
    id: 3,
    amount: "₹ 20,000",
  },
  {
    id: 2,
    amount: "₹ 10,000",
  },
  {
    id: 1,
    amount: "₹ 5,000",
  },
];

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [data, setData] = useState([]);
  const [timeOut, settimeout] = useState(false);

  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=14&category=18&type=multiple")
      .then((response) => {
        console.log(response.data.results);
        setData(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <div className="main">
        <div className="top">
          <div className="timer">30</div>
        </div>
        <div className="bottom">
          <QandA
            data={data}
            questionNumber={questionNumber}
            setQuestionNumber={setQuestionNumber}
            settimeout={settimeout}
          ></QandA>
        </div>
      </div>
      <div className="pyramid">
        <ul className="moneylist">
          {amountPyramid.map((items) => (
            <li
              className={
                questionNumber === items.id
                  ? "moneylistItem active"
                  : "moneylistItem"
              }
              key={items.id}
            >
              <span className="moneyListItemNumber">{items.id}</span>
              <span className="moneyListItemAmount">{items.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
