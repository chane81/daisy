import React from 'react';
import styled from 'styled-components';
import { device } from '../../library/styleHelper';
import ThumbnailListCardContainer from '../../containers/Cards/ThumbnailListCardContainer';
import YoutubePlayer from '../Player/YoutubePlayer';
import { IPlayerModelType } from '../../stores/storeTypes';
import Master from '../Layout/Master';
import { observer } from 'mobx-react';

/**
 * 설명:									인기트랙 page 의 presentation 컴포넌트
 * className:							css class 명
 * playerOptions:					유튜브 플레이어 옵션
 * leftMenuVisible:				레프트메뉴 visible true/false
 * handleYoutubeReady:		유튜브 플레이어 ready 이벤트 핸들러
 * handleThumbnailClick:	썸네일이미지 클릭 이벤트 핸들러
 */
interface IProps {
	className?: string;
	playerOptions: IPlayerModelType;
	leftMenuVisible: boolean;
	handleYoutubeReady: (e: any) => void;
	handleThumbnailClick: (
		videoId: string,
		title: string,
		channelId: string
	) => void;
}

const PopularTrackWrapper = styled('div')`
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

const PopularTrackSection: React.FC<IProps> = props => {
	return (
		<Master>
			<PopularTrackWrapper>
				<YoutubePlayer
					className='youtube-player'
					playerOptions={props.playerOptions}
					leftMenuVisible={props.leftMenuVisible}
					handleReady={props.handleYoutubeReady}
				></YoutubePlayer>
				<ThumbnailListCardContainer
					className='thumbnail-list'
					handleThumbnailClick={props.handleThumbnailClick}
					cardFlexBasis='13rem'
				></ThumbnailListCardContainer>
			</PopularTrackWrapper>
		</Master>
	);
};

export default observer(PopularTrackSection);
