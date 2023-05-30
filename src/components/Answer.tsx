import React, { useEffect } from 'react'
import correctAudio from "../assets/Audio/correct.wav"
import wrongAudio from "../assets/Audio/wrong.wav"

interface AnswerText {
  id: string;
  value: string;
}

interface AnswerProp {
  answerText: AnswerText;
  index: number;
  onSelectAnswer: (answerText: string) => void;
  currentAnswer: string | null;
  correctAnswer: string | null;
}

const Answer = ({ answerText, index, onSelectAnswer, currentAnswer, correctAnswer }: AnswerProp) => {
  
  const letters = ['A', 'B', 'C', 'D'];
  const isCorrectAnswer = currentAnswer && answerText?.id === correctAnswer;
  const forCorrectAudio = currentAnswer === correctAnswer;

  const isWrongAnswer = currentAnswer === answerText?.id && currentAnswer !== correctAnswer

  const correctAnswerClass = isCorrectAnswer ? "correct-answer" : "";
  const wrongAnswerClass = isWrongAnswer ? "wrong-answer" : "";
  const disabledClass = currentAnswer ? "disabled-answer" : "";


  useEffect(() => {
    if (forCorrectAudio) {
      const audio = new Audio(correctAudio);
      audio.play();
      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
  
    if (isWrongAnswer) {
      const audio = new Audio(wrongAudio);
      audio.play();
      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [forCorrectAudio, isWrongAnswer]);
  
  

  return (
    <div className={`answer  ${correctAnswerClass} ${wrongAnswerClass} ${disabledClass}`} onClick={ () => onSelectAnswer(answerText?.id)}>
      <div className='answer-letter'>{ letters[index] }</div>
      <div className='answer-text'>{ answerText?.value }</div>
    </div>
  )
}

export default Answer