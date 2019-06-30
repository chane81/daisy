import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { device } from '../../library/styleHelper';
import ThumbnailListCard from '../../components/Cards/ThumbnailListCard';
import YoutubePlayerContainer from '../../containers/Player/YoutubePlayerContainer';
import { IApiItemsModelType } from '../../stores/storeTypes';
import _ from 'lodash';

/**
 * 설명:									플레이 리스트 컴포넌트
 * className:							css class 명
 */
interface IProps {
	className?: string;
	apiItems?: IApiItemsModelType[];
	handleThumbnailClick?: (
		videoId: string,
		title: string,
		channelId: string
	) => void;
}

const TrackListWrapper = styled('div')<IProps>`
	display: flex;
	flex-flow: row nowrap;
	justify-content: end;
	height: calc(100vh - 50px);

	.youtube-player {
		padding-right: 0.7rem;
	}

	@media ${device.mobile} {
		flex-flow: column nowrap;
		.youtube-player {
			padding-right: 0;
		}
	}
`;

const TrackList: React.FC<IProps> = props => {
	return (
		<TrackListWrapper {...props}>
			<YoutubePlayerContainer></YoutubePlayerContainer>
			<ThumbnailListCard
				handleThumbnailClick={props.handleThumbnailClick}
				apiItems={props.apiItems}
				cardFlexBasis='13rem'
			></ThumbnailListCard>
		</TrackListWrapper>
	);
};

export default observer(TrackList);
