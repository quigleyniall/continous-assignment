// @flow

import * as React from 'react';
import Button from '../Button/Button';
import './Header.scss';

type HeaderProps = {
	createNote: () => void,
};

const Header = ({ createNote }: HeaderProps) => (
	<header className="header">
		<div className="header-left">
			<span className="header-title">Notes</span>
		</div>
		<div className="header-right">
			<Button
				type="button"
				text="create"
				icon="fas fa-plus"
				onPress={createNote}
			/>
		</div>
	</header>
);

export default Header;
