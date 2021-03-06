/**
	스타일드 컴포넌트 사용시에 @media 를 통한 반응형 css 를 작성할 때 쓰임
	
	// 사용 예제코드
	@media ${device.mobile} {
			.youtube-title {
				font-size: 1.4rem;
			}
		}
*/

export const device = {
	small: `(max-width: 319px)`,
	mobile: `(max-width: 767px)`,
	tablet: `(max-width: 1023px)`,
	desktop: `(min-width: 1024px)`
};
