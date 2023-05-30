import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import questions from '../data'
import { shuffleChoice } from '../utils/shuffleAnswer';
import { Question, Answer } from '../utils/types';

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  showResult: boolean;
  correctAnswerCount: number;
  answers: Answer[];
  currentAnswer: string;
}

const initialState: QuizState = {
    questions,
    currentQuestionIndex : 0,
    showResult : false,
    correctAnswerCount: 0,
    answers: shuffleChoice(questions[0]),
    currentAnswer: "",
  }


export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
      nextQuestion: (state) => {
        const showResult =  state.currentQuestionIndex === state.questions.length - 1;

        const currentQuestionIndex = showResult ? state.currentQuestionIndex
                                                 : state.currentQuestionIndex + 1;
        const answers = showResult ? [] : shuffleChoice(state.questions[currentQuestionIndex]);
        
        return {
          ...state,
          currentQuestionIndex,
           showResult,
           answers,
           currentAnswer: "",
        }
       },

      restart: () => initialState,

      selectAnswer: (state, action: PayloadAction<string>) => {
          const correctAnswerCount = action.payload === state.questions[state.currentQuestionIndex].correct_answer ?
          state.correctAnswerCount + 1 :
          state.correctAnswerCount;

          return {
            ...state,
            currentAnswer: action.payload,
            correctAnswerCount,
          }

       }
    }
})

export const { nextQuestion, restart, selectAnswer } = quizSlice.actions
export default quizSlice.reducer