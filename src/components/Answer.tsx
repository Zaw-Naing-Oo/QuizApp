import React, { useEffect } from 'react'
import correctAudio from "../assets/Audio/correct.wav"
import wrongAudio from "../assets/Audio/wrong.wav"
import { AnswerProp } from '../utils/type'

const Answer = ({ answerText, index, onSelectAnswer, currentAnswer, correctAnswer }: AnswerProp) => {
  
  const letters = ['A', 'B', 'C', 'D'];
  const isCorrectAnswer = currentAnswer && answerText?.id === correctAnswer;
  const forCorrectAudio = currentAnswer === correctAnswer;

  const isWrongAnswer = currentAnswer === answerText?.id && currentAnswer !== correctAnswer

  const correctAnswerClass = isCorrectAnswer ? "correct-answer" : "";
  const wrongAnswerClass = isWrongAnswer ? "wrong-answer" : "";
  const disabledClass = currentAnswer ? "disabled-answer" : "";


  useEffect(() => {

    const playAudio = (audioSrc: string | undefined) => {
      const audio = new Audio(audioSrc);
      audio.play();
      return audio;
    };

    let audio: HTMLMediaElement | undefined;

      if (forCorrectAudio) {
        audio = playAudio(correctAudio);
      }

      if (isWrongAnswer) {
        audio = playAudio(wrongAudio);
      }

      return () => {
        if (audio && audio instanceof HTMLMediaElement) {
          audio.pause();
          audio.currentTime = 0;
        }
      };
  }, [forCorrectAudio, isWrongAnswer]);
  
  

  return (
    <div className={`answer  ${correctAnswerClass} ${wrongAnswerClass} ${disabledClass}`} onClick={ () => onSelectAnswer(answerText?.id)}>
      <div className='answer-letter'>{ letters[index] }</div>
      <div className='answer-text'>{ answerText?.value }</div>
    </div>
  )
}

export default Answer