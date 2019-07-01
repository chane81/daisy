import React from 'react';
import styled from 'styled-components';
import { device } from '../../library/styleHelper';
import MasterLayout from '../Common/MasterLayout';
import { observer } from 'mobx-react';
import TrackListContainer from '../../containers/TrackList/TrackListContainer';

/**
 * 설명:									인기트랙 page 의 presentation 컴포넌트
 * @className:							css class 명
 */
interface IProps {
	className?: string;
}

const PopularTracksLayoutWrapper = styled('div')<IProps>``;

const PopularTracksLayout: React.FC<IProps> = props => {
	return (
		<MasterLayout>
			<PopularTracksLayoutWrapper {...props}>
				<TrackListContainer />
			</PopularTracksLayoutWrapper>
		</MasterLayout>
	);
};

export default observer(PopularTracksLayout);
