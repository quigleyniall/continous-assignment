// @flow

import {
	fetchAllNotes,
	fetchNote,
	createNewNote,
	updateNote,
	errorHandler,
} from '../actions';


type Note = {
	id: number,
	title: string,
	note: string,
};

type Action = {
  type: String,
  payload: any
}

type State = {
	notes: Note[],
	selectedNote: Note | null,
	error: boolean | string,
};

const initialState = {
	notes: [],
	selectedNote: null,
	error: false,
};

export const notesReducer = (state: State = initialState, action: Action) => {
	switch (action.type) {
		case fetchAllNotes:
			return {
				...state,
				notes: action.payload,
				error: false,
			};
		case fetchNote:
			return { ...state, selectedNote: action.payload };
		case createNewNote:
			return {
				...state,
				selectedNote: null,
				error: false,
			};
		case errorHandler:
			return { ...state, error: action.payload };
		case updateNote:
			return { ...state, error: false };
		default:
			return state;
	}
};
