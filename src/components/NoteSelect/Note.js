// @flow

import * as React from 'react';
import './Note.scss';

type NoteSelectProp = {
	selectNote: () => void,
	title: string,
};

const NoteSelect = ({ selectNote, title }: NoteSelectProp) => (
	<div className="note-selection" onClick={selectNote} role="presentation">
		<div className="note-title">{title}</div>
		<i className="fas fa-greater-than" />
	</div>
);

export default NoteSelect;
