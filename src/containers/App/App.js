//  @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { createNote } from '../../redux/actions';
import NoteContainer from '../NoteContainer/NoteContainer';
import NoteInputContainer from '../NoteInputContainer/NoteInputContainer';
import Header from '../../components/Header/Header';
import './App.scss';

type Props = {
  createNewNote: () => void
}

class App extends React.Component<Props> {
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

export default connect(
  null,
  { createNewNote: createNote }
)(App);
