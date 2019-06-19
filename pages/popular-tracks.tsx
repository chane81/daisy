import { Component } from 'react';
import styled, { css } from 'styled-components';
import { inject, observer } from 'mobx-react';
import YouTube from 'react-youtube';
import Master from '../components/Layout/Master';
import { IStore } from '../stores/storeTypes';

import ThumbnailListCardContainer from '../containers/Cards/ThumbnailListCardContainer';
import { getPlayListItems } from '../apis/youtubeApi';

interface IProps {
	store?: IStore;
}

const PopularTracksWrapper = styled('div')`
	display: flex;
	flex-flow: row nowrap;
	justify-content: end;
	.youtube-wrapper {
		/* 16:9 */
		min-width: calc(70vw - 11.4rem);
		max-width: calc(16 * calc(100vh - 115px) / 9);

		div {
			/* 16:9 */
			/* width:height ratio = 16/9 = 1.778 */
			/* height:width ratio = 9/16 = .5625  */
			.youtube {
				display: block;
				width: 100%;
				height: calc(70vw * 9 / 16);
				max-height: calc(100vh - 115px - 9.8rem);
			}
		}
		.youtube-title {
			display: flex;
			justify-content: center;
			align-items: center;
			border: 1px solid gray;
			height: 9.8rem;
			font-family: 'TmonMonsori', sans-serif;
			font-size: 2rem;
			font-weight: 100;
			max-width: calc(16 * calc(100vh - 115px) / 9);
		}

		@media screen and (max-width: 767px) {
			.youtube-title {
				font-size: 1.5rem;
			}
		}
	}

	.thumbnail-list {
		/* width: 20%; */
		border: 1px solid green;
	}
`;

class PopularTracks extends Component<IProps> {
	public constructor(props) {
		super(props);

		// 인기트랙 불러오기
		this.props.store!.apiModel.getPlayListItems(
			'PLTDluH66q5mpm-Bsq3GlwjMOHITt2bwXE',
			20
		);
	}

	// 플레이어 ready 시에 스토어에 플레이어객체 저장
	public handleReady = e => {
		const { apiModel, playerModel } = this.props.store!;
		const item = apiModel.playlistItems[0];

		// 디폴트 videoId 세팅
		playerModel.setVideoId(item.videoId);
		playerModel.setPlayer(e.target);
		playerModel.setTitle(item.title);
		playerModel.setStop();
	};

	// 썸네일 이미지 클릭시 유튜브 Play
	public handleThumbnailClick = (videoId: string, title: string) => {
		const { playerModel } = this.props.store!;

		playerModel.setVideoId(videoId);
		playerModel.setTitle(title);
		playerModel.setPlay();
	};

	public render() {
		const { playerModel } = this.props.store!;

		return (
			<Master>
				<PopularTracksWrapper>
					<div className='youtube-wrapper'>
						<YouTube
							className='youtube'
							videoId={playerModel.videoId}
							opts={playerModel.opts}
							onReady={this.handleReady}
						/>
						<div className='youtube-title'>{playerModel.title}</div>
					</div>

					<ThumbnailListCardContainer
						className='thumbnail-list'
						handleThumbnailClick={this.handleThumbnailClick}
					/>
				</PopularTracksWrapper>
			</Master>
		);
	}
}

export default inject(({ store }) => ({ store }))(observer(PopularTracks));
