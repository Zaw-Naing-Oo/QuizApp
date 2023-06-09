import { render, screen, cleanup } from "@testing-library/react"
import Answer from "./Answer";
import { act } from "react-dom/test-utils";

describe("Answer Component", () => {

  afterEach(() => {
    cleanup(); // Automatically unmount and clean up the component after each test
  });


   it("render initial state in the component", () => {
    const mockProps = {
        answerText: { id: "Q1_C1", value: "Mercury" },
        index: 0,
        onSelectAnswer: jest.fn(),
        currentAnswer: "",
        correctAnswer: "Q1_C3",
      };
      render(<Answer {...mockProps} />);
   })

   it("plays correct audio when answer is correct", () => {

      const playMock = jest.fn(); // Mock the play function
      const pauseMock = jest.fn(); // Mock the play function
       
       const mockProps = {
         answerText: { id: "Q1_C1", value: "Mercury" },
         index: 0,
         onSelectAnswer: jest.fn(),
         currentAnswer: "Q1_C3",
         correctAnswer: "Q1_C3",
        };

        type AudioConstructor = new () => HTMLMediaElement;
         // Replace the global Audio constructor with a mock implementation
          global.Audio = jest.fn(() => ({
            play: playMock,
            pause: pauseMock,
            currentTime: 0,
          })) as unknown as AudioConstructor;

        act( () => {
          render(<Answer {...mockProps} />);
        })

        expect(playMock).toHaveBeenCalledTimes(1);

        expect(pauseMock).not.toHaveBeenCalled();

   });

})
