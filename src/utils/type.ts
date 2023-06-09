export interface AnswerText {
    id: string;
    value: string;
  }
  
export interface AnswerProp {
    answerText: AnswerText;
    index: number;
    onSelectAnswer: (answerText: string) => void;
    currentAnswer: string | null;
    correctAnswer: string | null;
  }
  