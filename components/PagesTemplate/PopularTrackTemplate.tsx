import React from 'react';
import styled from 'styled-components';
import { device } from '../../library/styleHelper';
import ThumbnailListCardContainer from '../../containers/Cards/ThumbnailListCardContainer';
import YoutubePlayer from '../../components/Player/YoutubePlayer';
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
	handleThumbnailClick: (videoId: string, title: string) => void;
}

const PopularTrackWrapper = styled('div')`
	display: flex;
	flex-flow: row nowrap;
	justify-content: end;
	height: calc(100vh - 50px);

	@media ${device.mobile} {
		flex-flow: column nowrap;
	}
`;

const PopularTrackTemplate: React.FC<IProps> = props => {
	return (
		<Master>
			<PopularTrackWrapper>
				<YoutubePlayer
					playerOptions={props.playerOptions}
					leftMenuVisible={props.leftMenuVisible}
					handleReady={props.handleYoutubeReady}
				></YoutubePlayer>
				<ThumbnailListCardContainer
					className='thumbnail-list'
					handleThumbnailClick={props.handleThumbnailClick}
				></ThumbnailListCardContainer>
			</PopularTrackWrapper>
		</Master>
	);
};

export default observer(PopularTrackTemplate);
