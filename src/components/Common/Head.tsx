import NextHead from 'next/head';
import React from 'react';
import '../../styles/global.scss';

const defaultDescription = '';

/**
 * 설명:						<head></head> 테그안에 들어갈 내용이 담긴 컴포넌트
 */
interface IProps {
	title?: string;
	description?: string;
	defaultDescription?: string;
	url?: string;
}

const Head = (props: IProps) => (
	<NextHead>
		<meta charSet='UTF-8' />
		<title>{props.title || ''}</title>
		<meta
			name='description'
			content={props.description || defaultDescription}
		/>
		<meta name='viewport' content='width=device-width, initial-scale=1' />
		<link rel='icon' sizes='192x192' href='/static/touch-icon.png' />
		<link rel='apple-touch-icon' href='/static/touch-icon.png' />
		<link
			rel='mask-icon'
			href='/static/favicon-mask.svg'
			color='#49B882'
		/>
		<link rel='icon' href='/static/favicon.ico' />
	</NextHead>
);

export default Head;
