import React from 'react';
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

	.bodyArea {
		display: flex;
		flex-direction: row;
		min-height: 34.68rem;
		height: calc(100vh - 65px);

		.rightArea {
			display: flex;
			flex-direction: column;
			flex: 1;
			border-bottom: 1px solid #868e96;
			min-height: 50px;

			.contentsArea {
				flex: 1;
				overflow-y: auto;
			}
		}
	}
`;

interface IProps {
	children?: React.ReactNode;
}

const Master: React.FC<IProps> = props => (
	<MasterWrapper {...props}>
		<div className='bodyArea'>
			<LeftMenuContainer className='LeftMenuWrapper' />
			<div className='rightArea'>
				<HeaderContainer />

				<div id='contents' className='contentsArea'>
					{props.children}
				</div>
			</div>
		</div>
		<FooterContainer />
	</MasterWrapper>
);

export default Master;
