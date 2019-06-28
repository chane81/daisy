import React from 'react';
import styled from 'styled-components';

/**
 * 설명:						컴포넌트 예제 코드
 * className:				css class 명
 */
interface IProps {
	className?: string;
}

const MyComponentWrapper = styled('div')``;

const MyComponent: React.FC<IProps> = props => {
	return (
		<MyComponentWrapper {...props}>
			<div />
		</MyComponentWrapper>
	);
};

export default MyComponent;
