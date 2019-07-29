import React from 'react';
import styled from 'styled-components';
import HeaderContainer from '../../containers/Common/HeaderContainer';
import LeftMenuContainer from '../../containers/Common/LeftMenuContainer';

/**
 * 설명:						마스터 컴포넌트
 * className:				css class 명
 */
interface IProps {
	className?: string;
	handleNavClick?: () => void;
}

const MasterWrapper = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 115px;
	overflow-x: hidden;

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
		</MasterWrapper>
	);
};

export default Master;
