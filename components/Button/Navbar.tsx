import React from 'react';
import styled from 'styled-components';

/**
 * 설명:						네비바 버튼
 * className:				css class 명
 * btnTextName: 		버튼 표시 이름
 */
interface IProps {
	className?: string;
	btnTextName?: string;
}

const NavbarWrapper = styled('div')`
	display: flex;
	flex-direction: row;
	align-items: center;

	.nav-bar {
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
	}

	.nav-text {
		text-align: left;
		font-family: 'Impact', sans-serif;
		font-size: 1.6rem;
		width: 15%;
		i {
			margin: 0 25px 0 15px;
		}
	}
`;

const Navbar: React.FC<IProps> = props => {
	return (
		<NavbarWrapper {...props}>
			<div className='nav-bar'>
				<div />
			</div>
			<div className='nav-text'>
				<span>{props.btnTextName}</span>
			</div>
		</NavbarWrapper>
	);
};

export default Navbar;
