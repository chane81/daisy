import React, { useEffect } from 'react';
import styled from 'styled-components';
import FooterContainer from '../../containers/Layout/FooterContainer';
import HeaderContainer from '../../containers/Layout/HeaderContainer';
import LeftMenuContainer from '../../containers/Layout/LeftMenuContainer';

/**
 * 설명:						마스터 컴포넌트
 * className:				css class 명
 */
interface IProps {
	className?: string;
}

const MasterWrapper = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 115px;

	.body-area {
		display: flex;
		flex-direction: row;
		min-height: 34.68rem;
		height: 100vh;
		min-width: 360px;

		.right-area {
			display: flex;
			flex-direction: column;
			flex: 1;
			border-bottom: 1px solid #868e96;
			min-height: 50px;

			.contents-area {
				flex: 1;
				overflow-y: hidden;
			}
		}
	}
`;

interface IProps {
	children?: React.ReactNode;
}

const Master: React.FC<IProps> = props => {
	// 모바일 주소창 닫힘
	useEffect(() => {
		window.addEventListener(
			'load',
			() => {
				setTimeout(() => window.scrollTo(0, 1), 100);
			},
			false
		);
	}, []);

	return (
		<MasterWrapper {...props}>
			<div className='body-area'>
				<LeftMenuContainer className='left-menu-wrapper' />
				<div className='right-area'>
					<HeaderContainer />

					<div id='contents' className='contents-area'>
						{props.children}
					</div>
				</div>
			</div>
			{/* <FooterContainer /> */}
		</MasterWrapper>
	);
};

export default Master;
