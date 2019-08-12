import { combineReducers } from 'redux';
import { notesReducer } from './reducers/notes';

export const reducers = combineReducers({
	notes: notesReducer,
});
