import React from 'react';
import '../../styles/Layout/Header.scss';

const Header = () => {
	return (
		<div className='header-wrapper'>
			<div className='nav-area'>
				<i className='fas fa-bars fa-lg' />
				<span>DAISY</span>
			</div>
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
		</div>
	);
};

export default Header;
