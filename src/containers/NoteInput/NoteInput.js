// @flow

import * as React from 'react';
import { Editor, RichUtils } from 'draft-js';
import { customStlying } from '../../utils/toolbarStyles';

class NoteInput extends React.Component {
	constructor(props) {
		super(props);
		this.setEditor = editor => {
			this.editor = editor;
		};
		this.focusEditor = () => {
			if (this.editor) {
				this.editor.focus();
			}
		};
	}

	handleKeyCommand = command => {
		const { editorState } = this.props;
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			this.onChange(newState);
			return 'handled';
		}
		return 'not-handled';
	};

	render() {
		const { className, editorState, onChange } = this.props;
		return (
			<div
				className={`w-100 ${className}`}
				onClick={this.focusEditor}
				role="presentation">
				<Editor
					ref={this.setEditor}
					editorState={editorState}
					onChange={onChange}
					handleKeyCommand={this.handleKeyCommand}
					customStyleMap={customStlying}
				/>
			</div>
		);
	}
}

export default NoteInput;
