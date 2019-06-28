import React from 'react';
import styled from 'styled-components';
import ThumbnailCard from './ThumbnailCard';
import { device } from '../../library/styleHelper';

/**
 * 설명:						썸네일 카드
 * className:				css class 명
 */
interface IProps {
	className?: string;
}

const PlayItemCardWrapper = styled('div')<IProps>`
	.thumbnail-card-list {
		display: flex;
		flex-direction: row;
	}
`;

const PlayItemCard: React.FC<IProps> = props => {
	return (
		<PlayItemCardWrapper {...props}>
			<div>
				<div>김원의 [사건팩트 & 사건파일]</div>
				<div>
					★신비한 이야기, 수수께끼 들어 보실래요? ★김원의 "일요 Mystery" /
					"오컬트 Story" 많은 시청 해주세요.
				</div>
				<div className='thumbnail-card-list'>
					<ThumbnailCard
						imageUrl='https://i.ytimg.com/vi/MBdVXkSdhwU/hqdefault.jpg'
						width='13rem'
						height='13.5rem'
						title='[녹음된 의문의 목소리] S!!! O!!! S!!! 일본 최대 미스테리'
						className='thumbnail-card'
					></ThumbnailCard>
					<ThumbnailCard
						imageUrl='https://i.ytimg.com/vi/MBdVXkSdhwU/hqdefault.jpg'
						width='13rem'
						height='13.5rem'
						title='[녹음된 의문의 목소리] S!!! O!!! S!!! 일본 최대 미스테리'
						className='thumbnail-card'
					></ThumbnailCard>
					<ThumbnailCard
						imageUrl='https://i.ytimg.com/vi/MBdVXkSdhwU/hqdefault.jpg'
						width='13rem'
						height='13.5rem'
						title='[녹음된 의문의 목소리] S!!! O!!! S!!! 일본 최대 미스테리'
						className='thumbnail-card'
					></ThumbnailCard>
				</div>
			</div>
			<div>
				<div>김원의 [사건팩트 & 사건파일]</div>
				<div>
					★신비한 이야기, 수수께끼 들어 보실래요? ★김원의 "일요 Mystery" /
					"오컬트 Story" 많은 시청 해주세요.
				</div>
				<div className='thumbnail-card-list'>
					<ThumbnailCard
						imageUrl='https://i.ytimg.com/vi/MBdVXkSdhwU/hqdefault.jpg'
						width='13rem'
						height='13.5rem'
						title='[녹음된 의문의 목소리] S!!! O!!! S!!! 일본 최대 미스테리'
						className='thumbnail-card'
					></ThumbnailCard>
					<ThumbnailCard
						imageUrl='https://i.ytimg.com/vi/MBdVXkSdhwU/hqdefault.jpg'
						width='13rem'
						height='13.5rem'
						title='[녹음된 의문의 목소리] S!!! O!!! S!!! 일본 최대 미스테리'
						className='thumbnail-card'
					></ThumbnailCard>
					<ThumbnailCard
						imageUrl='https://i.ytimg.com/vi/MBdVXkSdhwU/hqdefault.jpg'
						width='13rem'
						height='13.5rem'
						title='[녹음된 의문의 목소리] S!!! O!!! S!!! 일본 최대 미스테리'
						className='thumbnail-card'
					></ThumbnailCard>
				</div>
			</div>
		</PlayItemCardWrapper>
	);
};

export default PlayItemCard;
