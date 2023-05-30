import React, { useEffect, useState } from "react";
import Questions from "./components/Questions";
import { restart } from "./features/quizSlice";
import html2canvas from "html2canvas";
import Confetti from 'react-confetti'
import successGif from "./assets/success.gif"
import { InfinitySpin } from  'react-loader-spinner'
import { useAppDispatch, useAppSelector } from "./app/hooks";

function App() {

  const [loading, setLoading] = useState<boolean>(true);
  const { quizz } = useAppSelector( state => state );
  const dispatch = useAppDispatch();

  const handleDownload = () => {
    const resultsElement = document.getElementById('results'); // Get the results container element
  
    if(resultsElement instanceof HTMLElement) {  // Check null
      html2canvas(resultsElement)
      .then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL(); // Convert the canvas to a data URL
        link.download = 'result.png'; // Set the file name for the download
        link.click(); // Trigger the download
    });
    }
  };


  useEffect( () => {
   setTimeout(() => setLoading(false), 5000)
  }, []);

  if (loading) {
   return (
     <div style={{ width: '100vw', background: '#000814', textAlign: 'center'}}>
      <h1 style={{ display: 'block', color: '#ffd60a'}}>Wellcome To Fun Quizz</h1>
       <InfinitySpin 
          width='200'
          color="#ffd60a"
        />
     </div>
   )
  }
   



  return (
    <div className="quiz">

      { quizz.showResult && (
        <>
          <div className="results" id="results">
            <Confetti style={{ width: "100%", height: "100%"}} />
            <div className="congratulations">Congratulations!</div>
              <div className="results-info">
                <div className="complete">You have completed the quiz.</div>
                  <div className="point-score">
                    You've got {quizz.correctAnswerCount} score of&nbsp;
                    {quizz.questions.length} right.
                  </div>
              </div>
            {quizz.correctAnswerCount > 0 && (
              <>
                <img src={successGif} alt="Success" className="success-gif" />
              </>
            )}
          </div>
          
          <div className="result-download-btn">
            <div
              onClick={() => dispatch(restart())}
              className="next-button"
            >
              Restart
            </div>
            <div
              onClick={handleDownload}
              className="next-button"
            >
              Download Result
            </div>
          </div>
        </>
      )}


     { !quizz.showResult && (
       <>
        <div className="score-and-question">
            <div className="question-count">
                  Question {quizz.currentQuestionIndex + 1 } / {quizz.questions.length}
            </div>
            <h1 className="score">{ quizz.correctAnswerCount}</h1>
        </div>
        <Questions />
       </>
     )}

    </div>
  );
}

export default App;
