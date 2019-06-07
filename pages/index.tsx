import { inject, observer } from 'mobx-react';
import Link from 'next/link';
import { Component } from 'react';
import Master from '../components/layout/Master';

interface IProps {
	store?: any;
}

class Index extends Component<IProps> {
	public render() {
		return (
			<Master>
				<Link href='/artist-list'>
					<a style={{ display: 'block' }}>가수별 리스트</a>
				</Link>
				<Link href='/album-list'>
					<a style={{ display: 'block' }}>앨범 리스트</a>
				</Link>
				<Link href='/top-rank-list'>
					<a style={{ display: 'block' }}>탑100 리스트</a>
				</Link>
			</Master>
		);
	}
}

export default inject(({ store }) => ({ store }))(observer(Index));
