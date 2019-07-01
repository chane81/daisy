import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { device } from '../../library/styleHelper';
import ThumbnailListCard from '../../components/Cards/ThumbnailListCard';
import YoutubePlayer from '../../components/Player/YoutubePlayer';
import {
	IApiItemsModelType,
	IPlayerModelType
} from '../../stores/storeTypes';

/**
 * 설명:										트렉리스트 컴포넌트
 * @className								css class 명
 * @apiItems								트랙리스트로 표시할 items
 * @playerOptions						유튜브 플레이어 옵션
 * @leftMenuVisible					레프트메뉴 visible true/false
 * @handlePlayerReady				유튜브 플레이어 onReady 핸들러
 * @handleThumbnailClick		썸네일 이미지 클릭 핸들러
 */
interface IProps {
	className?: string;
	apiItems?: IApiItemsModelType[];
	playerOptions: IPlayerModelType;
	leftMenuVisible?: boolean;
	handlePlayerReady: (e: any) => void;
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
			<YoutubePlayer
				playerOptions={props.playerOptions}
				handleReady={props.handlePlayerReady}
				leftMenuVisible={props.leftMenuVisible}
			></YoutubePlayer>

			<ThumbnailListCard
				handleThumbnailClick={props.handleThumbnailClick}
				apiItems={props.apiItems}
				cardFlexBasis='13rem'
			></ThumbnailListCard>
		</TrackListWrapper>
	);
};

export default observer(TrackList);
