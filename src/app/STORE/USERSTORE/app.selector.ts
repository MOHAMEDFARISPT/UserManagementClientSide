import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState, initialState } from "./app.state";

const InitialState = createFeatureSelector<AppState>('auth')
// Selector for the user property
export const selectUser = createSelector(
    InitialState,
    (state: AppState) => state.user
  );
  
  // Selector for the users array
  export const selectUsers = createSelector(
    InitialState,
    (state: AppState) => state.users
  );
  
  // Selector for the loading property
  export const selectLoading = createSelector(
    InitialState,
    (state: AppState) => state.loading
  );
  
  // Selector for the error property
  export const selectError = createSelector(
    InitialState,
    (state: AppState) => state.error
  );
  