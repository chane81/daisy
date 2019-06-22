import { Component } from 'react';
import styled, { css } from 'styled-components';
import { inject, observer } from 'mobx-react';
import Master from '../components/Layout/Master';
import { IStore } from '../stores/storeTypes';
import { device } from '../library/styleHelper';
import ThumbnailListCardContainer from '../containers/Cards/ThumbnailListCardContainer';
import YoutubePlayer from '../components/Player/YoutubePlayer';
import LeftMenu from '../components/Layout/LeftMenu';

interface IProps {
	store?: IStore;
	leftMenuVisible?: boolean;
}

const PopularTracksWrapper = styled('div')`
	display: flex;
	flex-flow: row nowrap;
	justify-content: end;
	height: calc(100vh - 50px);

	@media ${device.mobile} {
		flex-flow: column nowrap;
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
		const { uiModel } = this.props.store!;

		return (
			<Master>
				<PopularTracksWrapper>
					<YoutubePlayer
						videoId={playerModel.videoId}
						title={playerModel.title}
						opts={playerModel.opts}
						leftMenuVisible={uiModel.leftMenuVisible}
						handleReady={this.handleReady}
					/>
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
