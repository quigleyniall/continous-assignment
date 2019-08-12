// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import NoteSelect from '../../components/NoteSelect/Note';
import { fetchNotes, fetchNoteById } from '../../redux/actions';
import './NoteContainer.scss';

class NoteContainer extends React.Component<null> {
	componentDidMount() {
		// this.props.fetchNotes();
	}

	renderNotes = () => {
		const { notes, fetchNoteById } = this.props;
		return notes.map(note => (
			<NoteSelect
				title={note.title}
				selectNote={() => fetchNoteById(note.id)}
			/>
		));
	};

	render() {
		return <div className="note-wrapper">{this.renderNotes()}</div>;
	}
}

const mapStateToProps = ({ notes }) => {
	return {
		notes: notes.notes,
		selected: notes.selectedNote,
	};
};

export default connect(
	mapStateToProps,
	{ fetchNotes, fetchNoteById },
)(NoteContainer);
