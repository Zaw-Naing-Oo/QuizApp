import React, { useEffect, useState } from 'react'
import Answer from './Answer'
import { nextQuestion, selectAnswer } from '../features/quizSlice';

import { useAppDispatch, useAppSelector } from '../app/hooks';


const Questions = () => {
  const [remainingTime, setRemainingTime] = useState<number>(15)

  const dispatch = useAppDispatch();
  const { quizz } = useAppSelector( state => state );
  const currentQuestion = quizz.questions[quizz.currentQuestionIndex];


  const handleAnswerSelect = (userAnswerText:string) => {
    dispatch(selectAnswer(userAnswerText));
  };

  const handleNextQuestion = () => {
    dispatch(nextQuestion());
    setRemainingTime(15); // Reset the timer to 5 seconds
  };

  useEffect(() => {
    let interval:NodeJS.Timeout;
  
    if (remainingTime > 0 && !quizz.currentAnswer) {
      interval = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      dispatch(nextQuestion());
      setRemainingTime(15);
    }
  
    return () => clearInterval(interval);
  }, [remainingTime, quizz.currentAnswer, dispatch]);


  return (
    <>
      <div className="question">{currentQuestion.question}</div>
      <div className="answers">
        {quizz?.answers.map((answer, index) => (
          <Answer
            answerText={answer}
            key={index}
            index={index}
            onSelectAnswer={handleAnswerSelect}
            currentAnswer={quizz?.currentAnswer}
            correctAnswer={currentQuestion?.correct_answer}
          />
        ))}
      </div>

      {quizz?.currentAnswer ? (
          <div onClick={handleNextQuestion} className="next-button">
            Next Question
          </div>
        ) : (
          <div className="disable-button">
            Select Answer
          </div>
      )}

      <div className="timer">Time remaining: {remainingTime} seconds</div>
    </>
  )
}

export default Questions