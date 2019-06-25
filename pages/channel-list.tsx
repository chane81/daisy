import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { IStore } from '../stores/storeTypes';
import ChannelListSection from '../components/PagesSection/ChannelListSection';

/**
 * 설명:	채널리스트 page
 * store:	스토어
 */
interface IProps {
	store?: IStore;
}

class ChannelList extends Component<IProps> {
	public constructor(props) {
		super(props);

		// k-pop 채널 불러오기
		this.props.store!.apiModel.getChannelSearch('k-pop official', 4);
	}

	// 썸네일 이미지 클릭시 유튜브 Play
	public handleThumbnailClick = (
		videoId: string,
		title: string,
		channelId: string
	) => {
		const { playerModel } = this.props.store!;
	};

	public render() {
		return (
			<ChannelListSection
				handleThumbnailClick={this.handleThumbnailClick}
			/>
		);
	}
}

export default inject(({ store }) => ({ store }))(observer(ChannelList));