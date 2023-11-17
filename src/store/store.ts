import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    //   counter: counterSlice.reducer,
    //   todo: todoSlice.reducer,
    //   user: userSlice.reducer
});

// const initialState = {};

export const store = configureStore({
    reducer: rootReducer,
    //   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    // preloadedState: initialState,
    //   enhancers: (defaultEnhancers) => [...defaultEnhancers]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
