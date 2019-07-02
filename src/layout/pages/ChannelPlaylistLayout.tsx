import React from 'react';
import styled from 'styled-components';
import { device } from '../../library/styleHelper';
import MasterLayout from '../Common/MasterLayout';
import { observer } from 'mobx-react';
import PlayItemListCard from '../../components/Cards/PlayItemListCard';
import { IApiChannelInfoModelType } from '../../stores/storeTypes';
import commonHelper from '../../library/commonHelper';

/**
 * 설명:									채널리스트 page 의 presentation 컴포넌트
 * className:							css class 명
 */
interface IProps {
	className?: string;
	apiChannelInfo?: IApiChannelInfoModelType;
	handleThumbnailClick: (
		videoId: string,
		title: string,
		channelId: string
	) => void;
}

const ChannelPlaylistLayoutWrapper = styled('div')`
	display: flex;
	flex-flow: column nowrap;
	height: calc(100vh - 50px);

	.channel-header-info {
		display: flex;
		flex-flow: row nowrap;
		justify-content: start;
		align-items: center;
		min-height: 8rem;
		font-family: 'TmonMonsori', sans-serif;
		font-size: 2rem;
		font-weight: 100;
		background-color: #e9ecef;

		.channel-desc {
			width: 80%;
		}

		.channel-image {
			margin-left: 1rem;
			border: 2px solid #f8f9fa;
			border-radius: 50%;
			width: 5rem;
			height: 5rem;
			display: flex;
			flex-flow: column;
			justify-content: center;
			align-items: center;
			background-image: url('https://yt3.ggpht.com/a/AGF-l7-NQdbfxI9mOxPjpTV5NZ34oHC56_TgbLIHAA=s240-mo-c-c0xffffffff-rj-k-no');
			background-size: 5rem;
			box-shadow: 0 10px 10px rgba(0, 0, 0, 0.14),
				0 10px 10px rgba(0, 0, 0, 0.14);
		}
	}
`;

const ChannelPlaylistLayout: React.FC<IProps> = props => {
	const { baseInfo, playList } = props.apiChannelInfo!;

	return (
		<MasterLayout>
			<ChannelPlaylistLayoutWrapper>
				<div className='channel-header-info'>
					<div className='channel-image'></div>
					<div className='channel-desc'>
						<div>{baseInfo.title}</div>
						<div>
							구독자 {commonHelper.numFormat(baseInfo.subscriberCount)}명
						</div>
					</div>
				</div>
				<PlayItemListCard apiItems={playList}></PlayItemListCard>
			</ChannelPlaylistLayoutWrapper>
		</MasterLayout>
	);
};

export default observer(ChannelPlaylistLayout);
