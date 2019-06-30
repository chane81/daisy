import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from '../../library/routerHelper';

/**
 * 설명:						네비바 버튼
 * className:				css class 명
 * btnTextName: 		버튼 표시 이름
 * btnKind:					버튼종류 - X: x 버튼,  A: arrow 버튼
 * visible:					visible true/false
 * handleNavClick:	클릭 이벤트 핸들러
 */
interface IProps {
	className?: string;
	btnTextName?: string;
	btnKind?: string;
	visible?: boolean;
	handleNavClick?: () => void;
}

const NavbarWrapper = styled('div')<IProps>`
	display: ${(props: IProps) =>
		props.visible || props.visible === undefined ? 'flex' : 'none'};
	flex-direction: row;
	align-items: center;
	height: 50px;

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
			margin: 5.5px 0;

			transition: all 0.2s ease-in-out;
		}

		${(props: IProps) => {
			const isArrow = props.btnKind === 'A';
			const transY: string = isArrow ? '3.5px' : '8px';
			const width: string = isArrow ? '15px' : '25px';

			return css`
				:hover:before {
					transform: translateY(${transY}) rotate(130deg);
					width: ${width};
				}

				:hover:after {
					transform: translateY(-${transY}) rotate(-133deg);
					width: ${width};
				}
			`;
		}};

		:hover div {
			transform: scale(0);
		}
	}

	.nav-text {
		text-align: left;
		font-family: 'Impact', sans-serif;
		font-size: 1.6rem;
		width: 15%;
		cursor: pointer;
		i {
			margin: 0 25px 0 15px;
		}
	}
`;

const Navbar: React.FC<IProps> = props => {
	return (
		<NavbarWrapper {...props}>
			<div className='nav-bar' onClick={props.handleNavClick}>
				<div />
			</div>
			<div className='nav-text'>
				<Link route='/'>
					<span>{props.btnTextName}</span>
				</Link>
			</div>
		</NavbarWrapper>
	);
};

export default Navbar;
