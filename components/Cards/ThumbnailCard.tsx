import React from 'react';
import styled from 'styled-components';

/**
 * 설명:						썸네일 카드
 * className:				css class 명
 */
interface IProps {
	className?: string;
	width?: string;
	height?: string;
	imageUrl?: string;
	videoId?: string;
	title?: string;
	flexBasis?: string;
	handleClick?: (videoId: string) => void;
}

const ThumbnailCardWrapper = styled('div')<IProps>`
	display: flex;
	flex-flow: column wrap;
	width: ${(props: IProps) => props.width};
	height: ${(props: IProps) => props.height};
	flex: 1 ${(props: IProps) => props.flexBasis};
	margin: 0.5rem;

	img {
		width: 100%;
	}

	border: 1px solid #ced4da;
	cursor: pointer;

	&:hover {
		background-color: #ffffff;
		opacity: 0.5;
	}

	.title {
		flex: 1;
		font-size: 0.8rem;
		overflow-y: hidden;
		display: flex;
		flex-flow: column wrap;
		justify-content: center;
		align-items: center;
		margin: 0.5rem 0;
	}
`;

const ThumbnailCard: React.FC<IProps> = props => {
	return (
		<ThumbnailCardWrapper
			{...props}
			onClick={() => props.handleClick!(props.videoId!)}
		>
			<img src={props.imageUrl} />
			<div className='title'>{props.title}</div>
		</ThumbnailCardWrapper>
	);
};

export default ThumbnailCard;
