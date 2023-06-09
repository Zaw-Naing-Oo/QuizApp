import { render, screen, act } from "@testing-library/react"
import { Provider } from "react-redux"
import store from "../app/store"
import Questions from "./Questions"
import userEvent from "@testing-library/user-event"

describe("Question Component", () => {

    beforeEach( () => {
        jest.useFakeTimers();
    })

    afterEach( () => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    })

    it("increment timer correctly", () => {
        render(
            <Provider store={store}>
              <Questions />
            </Provider>
        );

        const timer = screen.getByText("Time remaining: 15 seconds");
        expect(timer).toBeInTheDocument();

        act( () => {
            jest.advanceTimersByTime(5000);
        })

        const updatedTimer = screen.getByText("Time remaining: 10 seconds");
        expect(updatedTimer).toBeInTheDocument();    

        act( () => {
            jest.advanceTimersByTime(5000);
        })
        const updatedTimer2 = screen.getByText("Time remaining: 5 seconds");
        expect(updatedTimer2).toBeInTheDocument();    
    });


    it("disables button when answer is not selected", () => {
        render(
          <Provider store={store}>
            <Questions />
          </Provider>
        );

        
      
        const selectAnswerButton = screen.queryByText("Select Answer");
        expect(selectAnswerButton).toBeInTheDocument();
      
        const nextQuestionButton = screen.queryByText("Next Question");
        expect(nextQuestionButton).not.toBeInTheDocument();
      });
      

    it("render timer, questions and answer option", () => {
        render(
            <Provider store={store}>
                <Questions />
            </Provider>
        )
         const questionElement = screen.getByText("Which planet is known as the \"Red Planet\"?");
         expect(questionElement).toBeInTheDocument();

         const option1 = screen.getByText("Mercury");
         expect(option1).toBeInTheDocument();

         const option2 = screen.getByText("Venus");
         expect(option2).toBeInTheDocument();

         const option3 = screen.getByText("Mars");
         expect(option3).toBeInTheDocument();

         const option4 = screen.getByText("Jupiter");
         expect(option4).toBeInTheDocument();

         userEvent.click(option3);

         const nextButton = screen.getByText("Next Question");
         expect(nextButton).toBeInTheDocument();

         userEvent.click(option3);

         const timer = screen.getByText("Time remaining: 15 seconds");
        expect(timer).toBeInTheDocument();

         const questionElement2 = screen.getByText("Next Question");
         expect(questionElement2).toBeInTheDocument();
    });
})