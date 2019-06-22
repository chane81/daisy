import React, { useRef } from 'react';
import styled from 'styled-components';
import Navbar from '../Button/Navbar';
import { device } from '../../library/styleHelper';

/**
 * 설명:						헤더 컴포넌트, 검색바 네비바가 위치함
 * className:				css class 명
 * navbarVisible:		nav바 비져블 true/false
 * handleNavClick:	nav바 클릭 이벤트 핸들러
 */
interface IProps {
	className?: string;
	navbarVisible?: boolean;
	handleNavClick?: () => void;
	handleSearchClick?: (searchText: string) => void;
}

const HeaderWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 50px;
	border-bottom: solid 1px #868e96;

	.search-area {
		flex: 1;

		.search-box {
			border: solid 1px #dee2e6;
			border-right: none;
			border-radius: 10px 0 0 10px;
			height: 2rem;
			width: 50%;
			min-width: 11.5em;
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
			background-color: #f1f3f5;
			&:hover {
				background-color: #e9ecef;
			}
		}

		@media ${device.desktop + ',' + device.tablet} {
			.search-box,
			.search-icon {
				font-size: 1rem;
			}
		}

		@media ${device.mobile} {
			.search-box,
			.search-icon {
				font-size: 0.7rem;
			}

			.search-icon {
				margin-right: 0;
			}
		}
	}
`;

const Header: React.FC<IProps> = props => {
	const txtSearch = useRef<HTMLInputElement>(null);

	// 검색어 입력 후 엔터키 쳤을 때
	const handleSearch = e => {
		if (e.key === 'Enter') {
			props.handleSearchClick!(txtSearch.current!.value);
		}
	};

	return (
		<HeaderWrapper {...props}>
			<Navbar
				btnTextName='DAISY'
				btnKind='A'
				visible={props.navbarVisible}
				handleNavClick={props.handleNavClick}
			/>
			<div className='search-area'>
				<input
					className='search-box'
					type='text'
					placeholder='노래/가수를 검색해주세요.'
					onKeyDown={handleSearch}
					ref={txtSearch}
				/>
				<div
					className='search-icon'
					onClick={() =>
						props.handleSearchClick!(txtSearch.current!.value)
					}
				>
					<i className='fas fa-search' />
				</div>
			</div>
		</HeaderWrapper>
	);
};

export default Header;
