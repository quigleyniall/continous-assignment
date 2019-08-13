// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import NoteSelect from '../../components/NoteSelect/Note';
import { fetchNotes, fetchNoteById } from '../../redux/actions';
import './NoteContainer.scss';

type Note = {
	id: number,
	title: string,
	note: string,
};

type Props = {
  getAllNotes: () => void,
  getNoteById: (id: number) => void,
  notes: Note[]
}

class NoteContainer extends React.Component<Props> {
	componentDidMount() {
		const { getAllNotes } = this.props;
		getAllNotes();
	}

	componentWillUpdate() {
		const { getAllNotes } = this.props;
		getAllNotes();
	}

	renderNotes = () => {
		const { notes, getNoteById } = this.props;
		return notes.map(note => (
			<NoteSelect
				title={note.title}
				selectNote={() => getNoteById(note.id)}
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
	};
};

const mapDispatchToProps = {
	getAllNotes: fetchNotes,
	getNoteById: fetchNoteById,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(NoteContainer);
