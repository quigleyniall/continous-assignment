//  @flow

import * as React from 'react';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import './App.scss';

type State = {
	createNewNote: boolean,
};

class App extends React.Component<null, State> {
	state = {
		createNewNote: false,
	};

	createNote = () => {
		console.log('clicked');
		this.setState({ createNewNote: true });
	};

	saveNote = () => {
		console.log('saved');
	};

	render() {
		const { createNewNote } = this.state;
		return (
			<div className="wrapper">
				<Header createNote={this.createNote} />
				<div className="save-button">
					<Button
						icon="far fa-save"
						className="circle"
						type="button"
						onPress={this.saveNote}
						disabled
					/>
				</div>
			</div>
		);
	}
}

export default App;
