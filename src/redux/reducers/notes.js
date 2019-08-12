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

type State = {
	notes: Array<Note>,
	selectedNote: Note | null,
	selectedNoteId: number | null,
	error: boolean | string,
};

const initialState = {
	notes: [],
	selectedNote: null,
	selectedNoteId: null,
	error: false,
};

export const notesReducer = (state: State = initialState, action) => {
	switch (action.type) {
		case fetchAllNotes:
			return { ...state, notes: action.payload, error: false };
		case fetchNote:
			return {
				...state,
				selectedNote: state.notes.filter(
					note => note.id === action.payload,
				),
			};
		case createNewNote:
			return { ...state, error: false };
		case errorHandler:
			return { ...state, error: action.payload };
		case updateNote:
			return { ...state, error: false };
		default:
			return state;
	}
};
