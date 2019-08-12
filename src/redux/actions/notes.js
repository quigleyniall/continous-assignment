import axios from 'axios';
import {
	fetchAllNotes,
	fetchNote,
	createNewNote,
	updateNote,
	errorHandler,
} from './types';

export const fetchNotes = () => {
	return async dispatch => {
		try {
			const response = await axios.get('/notes');

			dispatch({
				type: fetchAllNotes,
				payload: response.data,
			});
		} catch (err) {
			dispatch({
				type: errorHandler,
				payload: 'Problem retrieving Notes',
			});
		}
	};
};

export const fetchNoteById = id => {
	return {
		type: fetchNote,
		payload: id,
	};
};

export const createNote = (title, note) => {
	return async dispatch => {
		try {
			const response = await axios.post('/notes', {
				title,
				note,
			});

			dispatch({
				type: createNewNote,
				payload: response.data,
			});
		} catch (err) {
			dispatch({
				type: errorHandler,
				payload: 'Problem creating Notes',
			});
		}
	};
};

export const updateNoteById = (title, note, id) => {
	return async dispatch => {
		try {
			const response = await axios.post(`/notes/${id}`, {
				title,
				note,
			});

			dispatch({
				type: updateNote,
				payload: response.data,
			});
		} catch (err) {
			dispatch({
				type: errorHandler,
				payload: 'Problem updating Note',
			});
		}
	};
};
