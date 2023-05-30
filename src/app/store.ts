import { configureStore } from '@reduxjs/toolkit'
import quizzReducer from "../features/quizSlice"

 const store = configureStore({
  reducer: {
    quizz : quizzReducer,
  },
})

// Infer the root state type from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Infer the dispatch type from the store itself
export type AppDispatch = typeof store.dispatch;

export default store;