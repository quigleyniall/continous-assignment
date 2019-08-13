// @flow

import * as React from 'react';
import {
	EditorState,
	RichUtils,
	convertToRaw,
	convertFromHTML,
	ContentState,
} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { connect } from 'react-redux';
import Button from '../../components/Button/Button';
import { blockTypes, inlineStyles } from '../../utils/toolbarStyles';
import NoteInput from '../NoteInput/NoteInput';
import { saveNote, updateNoteById } from '../../redux/actions';
import './NoteInputContainer.scss';

type Note = {
	id: number,
	title: string,
	note: string,
};

type State = {
  editorTitleState: EditorState,
  editorBodyState: EditorState,
  textChanged: boolean | (editorState: EditorState) => boolean
};

type Props = {
  saveNewNote: (title: string, note: string) => void,
  updateNote: (title: string, note: string, id: number) => void,
  selectedNote: Note | null
}

class NoteMainInput extends React.Component<Props, State> {
	constructor(props) {
		super(props);
		// eslint-disable-next-line react/state-in-constructor
		this.state = {
			editorTitleState: EditorState.createEmpty(),
			editorBodyState: EditorState.createEmpty(),
			textChanged: false,
		};
	}

	async componentWillReceiveProps(props) {
		const { selectedNote } = props;
		await this.setState({
			editorTitleState:
				selectedNote === null
					? EditorState.createEmpty()
					: EditorState.createWithContent(
							ContentState.createFromText(selectedNote.title),
					  ),
			editorBodyState:
				selectedNote === null
					? EditorState.createEmpty()
					: EditorState.createWithContent(
							ContentState.createFromBlockArray(
								convertFromHTML(selectedNote.note),
							),
					  ),
			textChanged: false,
		});
	}

	handleSubmit = async e => {
		e.preventDefault();
		const { selectedNote, saveNewNote, updateNote } = this.props;
		const { editorTitleState, editorBodyState } = this.state;
		const titleBlock = convertToRaw(editorTitleState.getCurrentContent())
			.blocks;
		const title = titleBlock.map(block => block.text).join('\n');
		const bodyHtml = stateToHTML(editorBodyState.getCurrentContent());
		return selectedNote === null
			? saveNewNote(title, bodyHtml)
			: updateNote(title, bodyHtml, selectedNote.id);
	};

	onStyleClick = (style: string) => {
		const { editorBodyState } = this.state;
		this.onChangeBody(RichUtils.toggleInlineStyle(editorBodyState, style));
	};

	onBlockClick = (block: string) => {
		const { editorBodyState } = this.state;
		this.onChangeBody(RichUtils.toggleBlockType(editorBodyState, block));
	};

	onChangeTitle = (editorTitleState: EditorState) => {
		this.setState({
			editorTitleState,
			textChanged: this.checkNoteHasTitle(editorTitleState),
		});
	};

	onChangeBody = (editorBodyState: EditorState) => {
		const { editorTitleState } = this.state;
		this.setState({
			editorBodyState,
			textChanged: this.checkNoteHasTitle(editorTitleState),
		});
	};

	checkNoteHasTitle = (editorTitleState: EditorState): boolean => {
		const titleBlock = convertToRaw(editorTitleState.getCurrentContent())
			.blocks;
		const title = titleBlock
			.map(block => block.text)
			.join('\n')
			.trim();
		return title.length > 0;
	};

	checkInlineStyles = (style: string): boolean => {
		const { editorBodyState } = this.state;
		const inlineStyle = editorBodyState.getCurrentInlineStyle();
		return inlineStyle.has(style);
	};

	checkBlockStyles = (style: string): boolean => {
		const { editorBodyState } = this.state;
		const startKey = editorBodyState.getSelection().getStartKey();
		const currentBlockType = editorBodyState
			.getCurrentContent()
			.getBlockForKey(startKey)
			.getType();
		return currentBlockType === style;
	};

	renderBlockStyles = () => {
		return blockTypes.map(button => (
			<Button
				text={button.text}
				onPress={() => this.onBlockClick(button.style)}
				className="input"
				clicked={this.checkBlockStyles(button.style)}
			/>
		));
	};

	renderInlineStyles = () => {
		return inlineStyles.map(button => (
			<Button
				text={button.text}
				onPress={() => this.onStyleClick(button.style)}
				className="input"
				clicked={this.checkInlineStyles(button.style)}
			/>
		));
	};

	render() {
		const { editorTitleState, textChanged, editorBodyState } = this.state;

		return (
			<form onSubmit={this.handleSubmit} className="w-100 padding-sm">
				<NoteInput
					className="title-input"
					editorState={editorTitleState}
					onChange={this.onChangeTitle}
				/>
				<div className="toolbar">
					<div className="w-100">{this.renderBlockStyles()}</div>
					<div className="w-100">{this.renderInlineStyles()}</div>
				</div>
				<NoteInput
					className="main-input"
					editorState={editorBodyState}
					onChange={this.onChangeBody}
				/>
				<div className="save-button">
					<Button
						icon="far fa-save"
						className="circle"
						type="submit"
						disabled={!textChanged}
					/>
				</div>
			</form>
		);
	}
}

const mapStateToProps = ({ notes }) => {
	return {
		selectedNote: notes.selectedNote,
	};
};

const mapActionsToProps = {
	saveNewNote: saveNote,
	updateNote: updateNoteById,
};

export default connect(
	mapStateToProps,
	mapActionsToProps,
)(NoteMainInput);
