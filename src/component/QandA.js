import React, { useEffect, useState } from "react";

function QandA({ data, questionNumber, setQuestionNumber, settimeout }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState();
  const [selectedOption, setSelectedOptin] = useState(null);
  const [className, setClassName] = useState("answer");
  const [chance, setChance] = useState(3);
  //------------------------------------------------------------------------------------------

  useEffect(() => {
    // accessing single question and answer set
    const temp = data[questionNumber - 1];
    // creating a array of options by combining the correct and incorrect answers
    let opt = [
      temp?.incorrect_answers[0],
      temp?.incorrect_answers[1],
      temp?.incorrect_answers[2],
    ];
    console.log(temp?.correct_answer);
    opt.push(temp?.correct_answer);
    // shuffling the array of options
    let shuffledArray = [];
    let shuff = [];
    for (let i = 0; i < opt.length; i++) {
      const randomIndex = Math.floor(Math.random() * opt.length);
      if (shuff.indexOf(randomIndex) === -1) {
        shuffledArray.push(opt[randomIndex]);
        shuff.push(randomIndex);
      } else {
        i--;
      }
    }

    //setting question and option state
    setQuestion(temp?.question);
    setOptions(shuffledArray);
    // setting the selected option back to null
    setSelectedOptin(null);

    // checking the number of chances
    if(chance === 0){
        settimeout(true)
    }
  }, [data, questionNumber]);

  // ----------------------------------------------------------------------------------------------

  const handleOnclick = (opt) => {
    setSelectedOptin(opt);
    setClassName("answer active");
    setTimeout(() => {
      if (opt === data[questionNumber - 1]?.correct_answer) {
        setClassName("answer correct");
        setTimeout(() => {
          setQuestionNumber((prev) => prev + 1);
        }, 3000);
      } else {
        setClassName("answer wrong");
        setChance((prev) => prev - 1);

        setTimeout(() => {
          setQuestionNumber((prev) => {
            if (prev !== 1) return prev - 1;
            else {
              settimeout(true);
              return prev;
            }
          });
        }, 3000);
      }
    }, 2000);
  };

  return (
    <div className="questionAnswer">
      {chance}
      <div className="question">{question}</div>
      <div className="answers">
        {options?.map((option, index) => (
          <div
            key={index}
            className={selectedOption === option ? className : "answer"}
            onClick={() => handleOnclick(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}

export default QandA;
