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

	.contentsArea {
		display: flex;
		flex-flow: row nowrap;

		.rightArea {
			flex: 1;
			border-bottom: 1px solid #868e96;
		}
	}
`;

interface IProps {
	propContents: React.ComponentType;
	children: React.ReactNode;
}

const Master: React.FC<IProps> = props => (
	<MasterWrapper {...props}>
		<div className='contentsArea'>
			<LeftMenuContainer className='LeftMenuWrapper' />
			<div className='rightArea'>
				<HeaderContainer />

				<div id='contents'>{props.children}</div>
			</div>
		</div>
		<FooterContainer />
	</MasterWrapper>
);

export default Master;
