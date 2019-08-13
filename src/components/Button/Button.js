// @flow

import React from 'react';
import './Button.scss';

type ButtonProps = {
	onPress: () => void,
	type: string,
	text?: string,
	icon?: string,
	className: string,
	disabled: boolean,
	clicked: boolean,
};

const Button = ({
	onPress,
	type,
	text,
	icon,
	className,
	disabled,
	clicked,
}: ButtonProps) => (
	<button
		onClick={onPress}
		className={
			disabled
				? `btn btn-${className} btn-disabled`
				: `btn btn-${className}`
		}
		disabled={disabled}
		type={type}>
		{icon ? (
			<span style={text ? { paddingRight: '5px' } : { paddingRight: 0 }}>
				<i className={icon} />
			</span>
		) : null}
		{clicked ? <span className="btn-clicked">{text}</span> : text}
	</button>
);

Button.defaultProps = {
  onPress: () => {},
	disabled: false,
	className: 'btn',
	clicked: false,
	type: 'button',
};

export default Button;
