import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './app/store';

describe('App component', () => {
 
  it('display loading state initially', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    // Verify that loading message is displayed
    const loadingMesage = screen.getByText('Wellcome To Fun Quizz');
    expect(loadingMesage).toBeInTheDocument();
  });

  it('display the quiz after loading', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    setTimeout(() => {
      // Verify that the quiz section is rendered
      const quizSection = screen.queryByText('Question');
    expect(quizSection).toBeInTheDocument();

    // Verify that the result section is not rendered
    const resultSection = screen.queryByText('Congratulations!');
    expect(resultSection).not.toBeInTheDocument();
    }, 5000);
  })
  
});
