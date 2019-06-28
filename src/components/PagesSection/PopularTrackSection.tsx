import React from 'react';
import styled from 'styled-components';
import { device } from '../../library/styleHelper';
import Master from '../Layout/Master';
import { observer } from 'mobx-react';
import TrackListContainer from '../../containers/TrackList/TrackListContainer';

/**
 * 설명:									인기트랙 page 의 presentation 컴포넌트
 * className:							css class 명
 */
interface IProps {
	className?: string;
}

const PopularTrackWrapper = styled('div')<IProps>``;

const PopularTrackSection: React.FC<IProps> = props => {
	return (
		<Master>
			<PopularTrackWrapper {...props}>
				<TrackListContainer></TrackListContainer>
			</PopularTrackWrapper>
		</Master>
	);
};

export default observer(PopularTrackSection);
