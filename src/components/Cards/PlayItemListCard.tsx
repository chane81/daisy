import React from 'react';
import styled from 'styled-components';
import ThumbnailCard from './ThumbnailCard';
import Slider from 'react-slick';
import { device } from '../../library/styleHelper';
import '../../styles/slider.scss';
import { IApiItemsModelType } from '../../stores/storeTypes';

/**
 * 설명:						썸네일 카드
 * className:				css class 명
 */
interface IProps {
	className?: string;
	apiItems?: IApiItemsModelType[];
}

const PlayItemListCardWrapper = styled('div')<IProps>`
	width: calc(100vw - 11.5rem);

	.thumbnail-card {
		margin: 0;
		width: 95% !important;
	}

	.slick-dots li button:before {
		font-size: 25px;
	}

	@media ${device.mobile} {
		.thumbnail-card {
			img {
				width: 100%;
			}
		}
	}
`;

const PlayItemListCard: React.FC<IProps> = props => {
	const sliderSettings = {
		dots: true,
		arrows: false,
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 3,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					infinite: true,
					dots: true
				}
			}
		]
	};

	return (
		<PlayItemListCardWrapper {...props}>
			<div>김원의 [사건팩트 & 사건파일]</div>
			<div>
				★신비한 이야기, 수수께끼 들어 보실래요? ★김원의 "일요 Mystery" /
				"오컬트 Story" 많은 시청 해주세요.
			</div>
			<div className='slider'>
				<Slider {...sliderSettings}>
					<ThumbnailCard
						imageUrl='https://i.ytimg.com/vi/MBdVXkSdhwU/hqdefault.jpg'
						width='11rem'
						title='[녹음된 의문의 목소리] S!!! O!!! S!!! 일본 최대 미스테리'
						className='thumbnail-card'
					></ThumbnailCard>
					<ThumbnailCard
						imageUrl='https://i.ytimg.com/vi/MBdVXkSdhwU/hqdefault.jpg'
						width='11rem'
						title='[녹음된 의문의 목소리] S!!! O!!! S!!! 일본 최대 미스테리'
						className='thumbnail-card'
					></ThumbnailCard>
					<ThumbnailCard
						imageUrl='https://i.ytimg.com/vi/MBdVXkSdhwU/hqdefault.jpg'
						width='11rem'
						title='[녹음된 의문의 목소리] S!!! O!!! S!!! 일본 최대 미스테리'
						className='thumbnail-card'
					></ThumbnailCard>
					<ThumbnailCard
						imageUrl='https://i.ytimg.com/vi/MBdVXkSdhwU/hqdefault.jpg'
						width='13rem'
						title='[녹음된 의문의 목소리] S!!! O!!! S!!! 일본 최대 미스테리'
						className='thumbnail-card'
					></ThumbnailCard>
					<ThumbnailCard
						imageUrl='https://i.ytimg.com/vi/MBdVXkSdhwU/hqdefault.jpg'
						width='13rem'
						title='[녹음된 의문의 목소리] S!!! O!!! S!!! 일본 최대 미스테리'
						className='thumbnail-card'
					></ThumbnailCard>
					<ThumbnailCard
						imageUrl='https://i.ytimg.com/vi/MBdVXkSdhwU/hqdefault.jpg'
						width='13rem'
						title='[녹음된 의문의 목소리] S!!! O!!! S!!! 일본 최대 미스테리'
						className='thumbnail-card'
					></ThumbnailCard>
				</Slider>
			</div>
		</PlayItemListCardWrapper>
	);
};

export default PlayItemListCard;
