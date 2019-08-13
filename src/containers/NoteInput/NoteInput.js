// @flow


import * as React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { customStlying } from '../../utils/toolbarStyles';

type NoteInputProps = {
  editorState: EditorState,
  className: string,
  onChange: (state: EditorState) => void
}

class NoteInput extends React.Component<NoteInputProps> {
  editor;

  focusEditor = () => {
    if (this.editor) {
      this.editor.focus();
    }
  };

	handleKeyCommand = (command) => {
		const { editorState, onChange } = this.props;
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			onChange(newState);
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
					// eslint-disable-next-line no-return-assign
					ref={editor => this.editor = editor}
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
