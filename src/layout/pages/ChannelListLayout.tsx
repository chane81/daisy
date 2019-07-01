import React from 'react';
import styled from 'styled-components';
import { device } from '../../library/styleHelper';
import MasterLayout from '../Common/MasterLayout';
import { observer } from 'mobx-react';
import ThumbnailListCard from '../../components/Cards/ThumbnailListCard';
import { IApiItemsModelType } from '../../stores/storeTypes';

/**
 * 설명:									채널리스트 page 의 presentation 컴포넌트
 * className:							css class 명
 */
interface IProps {
	className?: string;
	apiChannelItems?: IApiItemsModelType[];
	handleThumbnailClick: (
		videoId: string,
		title: string,
		channelId: string
	) => void;
}

const ChannelListLayoutWrapper = styled('div')`
	display: flex;
	flex-flow: row nowrap;
	height: calc(100vh - 50px);

	@media ${device.desktop} {
		.thumbnail-list {
			align-content: space-around;
			justify-content: center;
		}
	}

	@media ${device.tablet} {
		.thumbnail-list {
			align-content: start;
			justify-content: center;
			padding: 1rem 0 0.5rem 0;
		}
	}
`;

const ChannelListLayout: React.FC<IProps> = props => {
	return (
		<MasterLayout>
			<ChannelListLayoutWrapper>
				<ThumbnailListCard
					className='thumbnail-list'
					handleThumbnailClick={props.handleThumbnailClick}
					apiItems={props.apiChannelItems}
					cardWidth='12rem'
					cardFlexBasis='none'
				></ThumbnailListCard>
			</ChannelListLayoutWrapper>
		</MasterLayout>
	);
};

export default observer(ChannelListLayout);
