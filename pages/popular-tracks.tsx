import { Component } from 'react';
import styled, { css } from 'styled-components';
import { inject, observer } from 'mobx-react';
import YouTube from 'react-youtube';
import Master from '../components/Layout/Master';
import { IStore } from '../stores/storeTypes';
import { device } from '../library/styleHelper';
import ThumbnailListCardContainer from '../containers/Cards/ThumbnailListCardContainer';

interface IProps {
	store?: IStore;
}

const PopularTracksWrapper = styled('div')`
	display: flex;
	flex-flow: row nowrap;
	justify-content: end;

	.youtube-wrapper {
		display: flex;
		flex-flow: column nowrap;
		border-right: 1px solid #868e96;

		/* 16:9 */
		min-width: calc(55vw);
		max-width: calc(16 * calc(100vh - 115px) / 9);

		div {
			padding-right: -2px;
			/* 16:9 */
			/* width:height ratio = 16/9 = 1.778 */
			/* height:width ratio = 9/16 = .5625  */
			.youtube {
				display: block;
				width: 100%;
				min-height: calc(55vw * 9 / 16);
				max-height: calc(100vh - 115px - 9.8rem);
			}
		}
	}

	.youtube-title {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 9.8rem;
		font-family: 'TmonMonsori', sans-serif;
		font-size: 2rem;
		font-weight: 100;
		max-width: calc(16 * calc(100vh - 115px) / 9);
	}

	@media ${device.desktop + ',' + device.tablet} {
		.youtube-title {
			flex: 1;
		}
	}

	@media ${device.mobile} {
		.youtube-title {
			flex: 1 1 100;
			font-size: 1.4rem;
			border-bottom: 1px solid #adb5bd;
			height: 7rem;
		}

		.thumbnail-card {
			flex-flow: row nowrap;
			flex: 1 25rem;
			padding: 0 0 1rem 0;
			border-top: none;
			border-left: none;
			border-right: none;
			border-bottom: 1px solid #adb5bd;

			img {
				width: 10rem;
			}
		}

		.thumbnail-list {
			padding: 1rem 0 0 0;
			height: calc(100vh - 35rem);
		}

		flex-flow: column nowrap;
	}

	@media ${device.desktop} {
		.thumbnail-card {
			flex: 1 1 13rem;
		}
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
						<div
							className='youtube-title'
							dangerouslySetInnerHTML={{ __html: playerModel.title }}
						/>
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
