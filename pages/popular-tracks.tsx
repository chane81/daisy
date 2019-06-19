import { Component } from 'react';
import styled, { css } from 'styled-components';
import { inject, observer } from 'mobx-react';
import YouTube from 'react-youtube';
import Master from '../components/Layout/Master';
import { IStore } from '../stores/storeTypes';

import ThumbnailListCardContainer from '../containers/Cards/ThumbnailListCardContainer';

interface IProps {
	store?: IStore;
}

const PopularTracksWrapper = styled('div')`
	.youtube-wrapper {
		div {
			padding: 1rem 2rem 1.5rem 2rem;

			.youtube {
				width: 100%;
			}
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

		// 디폴트 videoId 세팅
		const videoId = apiModel.playlistItems[0].videoId;
		playerModel.setVideoId(videoId);
		playerModel.setPlayer(e.target);
		playerModel.setStop();
	};

	// 썸네일 이미지 클릭시 유튜브 Play
	public handleThumbnailClick = (videoId: string) => {
		const { playerModel } = this.props.store!;

		playerModel.setVideoId(videoId);
		playerModel.setPlay();
	};

	public render() {
		const { playerModel } = this.props.store!;

		return (
			<PopularTracksWrapper>
				<Master>
					<div className='youtube-wrapper'>
						<YouTube
							className='youtube'
							videoId={playerModel.videoId}
							opts={playerModel.opts}
							onReady={this.handleReady}
						/>
					</div>

					<div style={{ width: '100%' }}>
						<hr style={{ width: '50%', border: '0.5px solid #868e96' }} />
					</div>

					<ThumbnailListCardContainer
						handleThumbnailClick={this.handleThumbnailClick}
					/>
				</Master>
			</PopularTracksWrapper>
		);
	}
}

export default inject(({ store }) => ({ store }))(observer(PopularTracks));
