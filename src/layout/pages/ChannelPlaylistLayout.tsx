import React from 'react';
import styled, { css } from 'styled-components';
import { device } from '../../library/styleHelper';
import MasterLayout from '../Common/MasterLayout';
import { observer } from 'mobx-react';
import PlayItemListCard from '../../components/Cards/PlayItemListCard';
import {
	IApiChannelInfoModelType,
	IPlayerModelType
} from '../../stores/storeTypes';
import commonHelper from '../../library/commonHelper';
import YoutubePlayer from '../../components/Player/YoutubePlayer';
import LayerContainer from '../../containers/Common/LayerContainer';

/**
 * 설명:									채널리스트 page 의 presentation 컴포넌트
 * className:							css class 명
 */
interface IProps {
	className?: string;
	apiChannelInfo?: IApiChannelInfoModelType;
	leftMenuVisible: boolean;
	playerOptions: IPlayerModelType;
	handlePlayerReady: (e: any) => void;
	handleThumbnailClick: (
		videoId: string,
		title: string,
		channelId: string
	) => void;
	handleLayerClose: () => void;
}

const ChannelPlaylistLayoutWrapper = styled('div')`
	display: flex;
	flex-flow: column nowrap;
	height: calc(100vh - 50px);

	@media ${device.mobile} {
		.channel-header-info {
			.channel-image {
				width: 4rem;
				height: 4rem;
				background-size: 4rem;
			}
			.channel-desc {
				font-size: 1.5rem;
			}
		}
	}

	@media ${device.desktop + ',' + device.tablet} {
		.channel-image {
			width: 5rem;
			height: 5rem;
			background-size: 5rem;
		}
		.channel-desc {
			font-size: 2rem;
		}
	}

	.channel-header-info {
		display: flex;
		flex-flow: row nowrap;
		justify-content: start;
		align-items: center;
		min-height: 8rem;
		font-family: 'TmonMonsori', sans-serif;
		font-weight: 100;
		background-color: #e9ecef;

		.channel-desc {
			width: 80%;
		}

		.channel-image {
			margin-left: 1rem;
			border: 2px solid #f8f9fa;
			border-radius: 50%;
			display: flex;
			flex-flow: column;
			justify-content: center;
			align-items: center;
			box-shadow: 0 10px 10px rgba(0, 0, 0, 0.14),
				0 10px 10px rgba(0, 0, 0, 0.14);

			${(props: IProps) => {
				const url = props.apiChannelInfo!.baseInfo.thumbnails!.medium!.url;

				return css`
					background-image: url(${url});
				`;
			}};
		}
	}
`;

const ChannelPlaylistLayout: React.FC<IProps> = props => {
	const { baseInfo, playList } = props.apiChannelInfo!;

	return (
		<MasterLayout>
			<ChannelPlaylistLayoutWrapper {...props}>
				<div className='channel-header-info'>
					<div className='channel-image'></div>
					<div className='channel-desc'>
						<div>{baseInfo.title}</div>
						<div>
							구독자 {commonHelper.numFormat(baseInfo.subscriberCount)}명
						</div>
					</div>
				</div>
				{/* <YoutubePlayer
					className='youtube-player'
					playerOptions={props.playerOptions}
					handleReady={props.handlePlayerReady}
					leftMenuVisible={props.leftMenuVisible}
				></YoutubePlayer> */}
				<PlayItemListCard
					apiItems={playList}
					leftMenuVisible={props.leftMenuVisible}
					handleThumbnailClick={props.handleThumbnailClick}
				></PlayItemListCard>
				<LayerContainer handleLayerClose={props.handleLayerClose}>
					<YoutubePlayer
						className='youtube-player'
						playerOptions={props.playerOptions}
						handleReady={props.handlePlayerReady}
						leftMenuVisible={props.leftMenuVisible}
					></YoutubePlayer>
				</LayerContainer>
			</ChannelPlaylistLayoutWrapper>
		</MasterLayout>
	);
};

export default observer(ChannelPlaylistLayout);
