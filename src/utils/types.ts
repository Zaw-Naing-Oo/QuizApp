export interface Question {
    id: string;
    question: string;
    choices: Answer[];
    correct_answer: string;
  }
  
  export interface Answer {
    id: string;
    value: string;
  }