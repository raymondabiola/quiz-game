import { useState } from "react";
import questions from "./questions.json";
import "./App.css";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setFeedback("✅ Correct!");
      setScore(score + 1);
    } else {
      setFeedback("❌ Wrong!");
    }

    setTimeout(() => {
      setFeedback(null);
      const next = currentQuestion + 1;
      if (next < questions.length) {
        setCurrentQuestion(next);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  return (
    <div className="app">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <div className="question-section">
          <h2>
            Question {currentQuestion + 1} / {questions.length}
          </h2>
          <h3>{questions[currentQuestion].question}</h3>

          {feedback && <p className="feedback">{feedback}</p>}

          <div className="answer-section">
            {questions[currentQuestion].answers.map((ans, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(ans.isCorrect)}
                disabled={feedback !== null}
              >
                {ans.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
