import axios from 'axios';
import {
	fetchAllNotes,
	fetchNote,
	createNewNote,
	saveNewNote,
	updateNote,
	errorHandler,
} from './types';

export const fetchNotes = () => {
	return async dispatch => {
		try {
			const response = await axios.get('/notes');

			dispatch({
				type: fetchAllNotes,
				payload: response.data.data,
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
	return async dispatch => {
		try {
			const response = await axios.get(`/notes/${id}`);

			dispatch({
				type: fetchNote,
				payload: response.data.data,
			});
		} catch (err) {
			dispatch({
				type: errorHandler,
				payload: `Problem retrieving note with id ${id}`,
			});
		}
	};
};

export const createNote = () => ({
	type: createNewNote,
});

export const saveNote = (title, note) => {
	return async dispatch => {
		try {
			const response = await axios.post('/notes', {
				title,
				note,
			});

			dispatch({
				type: saveNewNote,
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
			const { data } = await response;

			dispatch({
				type: updateNote,
				payload: data,
			});
		} catch (err) {
			dispatch({
				type: errorHandler,
				payload: 'Problem updating Note',
			});
		}
	};
};
