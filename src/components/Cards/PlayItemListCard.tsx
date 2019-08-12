import React from 'react';
import styled from 'styled-components';
import ThumbnailCard from './ThumbnailCard';
import Slider from 'react-slick';
import { device } from '../../library/styleHelper';
import '../../styles/slider.scss';
import {
	IApiItemsModelType,
	IApiTrackListModelType
} from '../../stores/storeTypes';

/**
 * 설명:						플레이 아이템 리스트 카드
 * className:				css class 명
 */
interface IProps {
	className?: string;
	apiItems?: IApiTrackListModelType[];
	leftMenuVisible?: boolean;
	handleThumbnailClick: (
		videoId: string,
		title: string,
		channelId: string
	) => void;
}

const PlayItemListCardWrapper = styled('div')<IProps>`
	width: ${(props: IProps) =>
		props.leftMenuVisible ? 'calc(100vw - 11.5rem)' : '100vw'};

	overflow-y: auto;
	overflow-x: hidden;
	background-color: #f8f9fa;

	.play-list {
		margin-bottom: 4rem;
	}

	.title {
		margin: 0.8rem 0 0.3rem 0;

		span {
			/* border-bottom: 15px solid red; */
			box-shadow: inset 0 -11px 0 #f783ac;
			color: #343a40;
			font-weight: 600;
			font-size: 1.3rem;
			font-family: 'TmonMonsori', sans-serif;
		}
	}

	/* scroll 바 */
	overflow-y: auto;
	::-webkit-scrollbar-thumb {
		background-color: #ced4da;
		border-radius: 8px;
		-webkit-border-radius: 8px;
		-moz-border-radius: 8px;
		-ms-border-radius: 8px;
		-o-border-radius: 8px;
	}
	&::-webkit-scrollbar {
		width: 8px;
	}
	&::-webkit-scrollbar-track {
		background: #f8f9fa;
	}
	/* scroll 바 */

	.slick-slide,
	.thumbnail-card {
		/* transition: all 10s ease-in-out; */
	}

	.thumbnail-card {
		margin: 0;
		width: 95% !important;
	}

	.slick-dots li button:before {
		font-size: 25px;
	}

	@media ${device.mobile} {
		.thumbnail-card {
			border: 0.7px solid #adb5bd;
			img {
				width: 100%;
			}
			.title {
				font-size: 0.8rem;
			}
		}
	}
`;

const PlayItemListCard: React.FC<IProps> = props => {
	const sliderSettings = {
		dots: true,
		arrows: true,
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

	const imageBind = (track: IApiItemsModelType) => {
		const imageUrl = !!track.thumbnails!
			? track.thumbnails!.medium!.url
			: '';

		return imageUrl;
	};

	return (
		<PlayItemListCardWrapper {...props}>
			{props.apiItems!.map((data, index) => (
				<div className='play-list' key={data.id}>
					<div className='title'>
						<span>{data.title}</span>
					</div>
					<div className='slider'>
						<Slider {...sliderSettings}>
							{data.tracks.map(track => (
								<ThumbnailCard
									key={track.id}
									videoId={track.videoId}
									imageUrl={imageBind(track)}
									width='11rem'
									height='13.5rem'
									title={track.title}
									className='thumbnail-card'
									handleClick={props.handleThumbnailClick}
								></ThumbnailCard>
							))}
						</Slider>
					</div>
				</div>
			))}

			{/* <div>김원의 [사건팩트 & 사건파일]</div>
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
			</div> */}
		</PlayItemListCardWrapper>
	);
};

export default PlayItemListCard;
