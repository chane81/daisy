import React from 'react';
import styled from 'styled-components';

interface IProps {
	className?: string;
}

const NavbarWrapper = styled('div')`
	margin: 1em;
	width: 25px;
	cursor: pointer;

	:after,
	:before,
	div {
		background-color: black;
		border-radius: 3px;
		content: '';
		display: block;
		height: 3px;
		margin: 5px 0;
		transition: all 0.2s ease-in-out;
	}

	:hover:before {
		transform: translateY(8px) rotate(130deg);
	}

	:hover:after {
		transform: translateY(-8px) rotate(-133deg);
	}

	:hover div {
		transform: scale(0);
	}
`;

const Navbar: React.FC<IProps> = props => {
	return (
		<NavbarWrapper {...props}>
			<div />
		</NavbarWrapper>
	);
};

export default Navbar;
