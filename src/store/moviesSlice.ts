import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import {Movie} from "../types/types";

interface MoviesState {
  movies: Movie[];
}

const initialState: MoviesState = {
  movies: [],
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
  },
});

export const { setMovies } = moviesSlice.actions;

export const selectMovies = (state: RootState) => state.movies.movies;

export default moviesSlice.reducer;
