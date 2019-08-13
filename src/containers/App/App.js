//  @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { createNote } from '../../redux/actions';
import NoteContainer from '../NoteContainer/NoteContainer';
import NoteInputContainer from '../NoteInputContainer/NoteInputContainer';
import Header from '../../components/Header/Header';
import './App.scss';

class App extends React.Component<null> {
	createNote = () => {
		const { createNewNote } = this.props;
		createNewNote();
	};

	render() {
		return (
			<div className="wrapper">
				<Header createNote={this.createNote} />
				<div className="main">
					<NoteContainer />
					<NoteInputContainer />
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ notes }) => {
	return {
		notes: notes.notes,
    selected: notes.selectedNote,
	};
};


const mapDispatchToProps = {
  createNewNote: createNote
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
