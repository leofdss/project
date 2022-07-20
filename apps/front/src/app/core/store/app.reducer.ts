import { createReducer, on } from '@ngrx/store';

import { AppActions } from './app.actions';
import { AppState } from './app.state';

const initialState: AppState = {
  search: '',
  list: {
    loading: false,
    error: null,
    items: [],
  },
  save: {
    error: null,
    loading: false,
  },
  delete: {
    error: null,
    loading: false,
  },
};

export const AppReducer = createReducer(
  initialState,
  on(AppActions.search, (state, action) => ({
    ...state,
    search: action.search,
  })),

  on(AppActions.save, (state) => ({
    ...state,
    save: {
      error: null,
      loading: true,
    },
  })),
  on(AppActions.saveSuccess, (state) => ({
    ...state,
    save: {
      error: null,
      loading: false,
    },
  })),
  on(AppActions.saveFailed, (state, action) => ({
    ...state,
    save: {
      error: action.error,
      loading: false,
    },
  })),

  on(AppActions.list, (state) => ({
    ...state,
    list: {
      loading: true,
      error: null,
      items: state.list.items,
    },
  })),
  on(AppActions.listSuccess, (state, action) => ({
    ...state,
    list: {
      loading: false,
      error: null,
      items: action.items,
    },
  })),
  on(AppActions.listFailed, (state, action) => ({
    ...state,
    list: {
      loading: false,
      error: action.error,
      items: state.list.items,
    },
  })),

  on(AppActions.delete, (state) => ({
    ...state,
    delete: {
      error: null,
      loading: true,
    },
  })),
  on(AppActions.deleteSuccess, (state) => ({
    ...state,
    delete: {
      error: null,
      loading: false,
    },
  })),
  on(AppActions.deleteFailed, (state, action) => ({
    ...state,
    delete: {
      error: action.error,
      loading: false,
    },
  }))
);
