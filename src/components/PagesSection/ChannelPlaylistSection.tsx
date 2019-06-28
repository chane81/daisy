import React from 'react';
import styled from 'styled-components';
import { device } from '../../library/styleHelper';
import Master from '../Layout/Master';
import { observer } from 'mobx-react';
import ThumbnailListCardContainer from '../../containers/Cards/ThumbnailListCardContainer';

/**
 * 설명:									채널리스트 page 의 presentation 컴포넌트
 * className:							css class 명
 */
interface IProps {
	className?: string;
	handleThumbnailClick: (
		videoId: string,
		title: string,
		channelId: string
	) => void;
}

const ChannelPlaylistSectionWrapper = styled('div')`
	display: flex;
	flex-flow: row nowrap;
	height: calc(100vh - 50px);
`;

const ChannelPlaylistSection: React.FC<IProps> = props => {
	return (
		<Master>
			<ChannelPlaylistSectionWrapper>
				<ThumbnailListCardContainer
					className='thumbnail-list'
					handleThumbnailClick={props.handleThumbnailClick}
					cardWidth='12rem'
					cardFlexBasis='none'
				></ThumbnailListCardContainer>
			</ChannelPlaylistSectionWrapper>
		</Master>
	);
};

export default observer(ChannelPlaylistSection);
