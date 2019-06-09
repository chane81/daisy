import React from 'react';
import styled from 'styled-components';
import Navbar from '../Button/Navbar';

/**
 * 설명:						헤더 컴포넌트, 검색바 네비바가 위치함
 * className:				css class 명
 */
interface IProps {
	className?: string;
}

const HeaderWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 50px;
	border-bottom: solid 1px #868e96;

	.search-area {
		width: 85%;
		text-align: right;

		input {
			border: solid 1px #dee2e6;
			border-right: none;
			border-radius: 10px 0 0 10px;
			line-height: 2rem;
			width: 300px;
			text-align: center;
		}

		.search-icon {
			margin-right: 40px;
			text-align: center;
			border: solid 1px #dee2e6;
			border-radius: 0 10px 10px 0;
			display: inline-block;
			line-height: 2rem;
			background-color: white;
			width: 50px;
			cursor: pointer;
			&:hover {
				background-color: #e9ecef;
			}
		}
	}
`;

const Header: React.FC<IProps> = props => {
	return (
		<HeaderWrapper {...props}>
			<Navbar btnTextName='DAISY' btnKind='A' />
			<div className='search-area'>
				<input
					className='search-box'
					type='text'
					placeholder='검색할 노래/가수를 입력해 주세요.'
				/>
				<div className='search-icon'>
					<i className='fas fa-search' />
				</div>
			</div>
			<hr />
		</HeaderWrapper>
	);
};

export default Header;
