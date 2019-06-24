import { inject, observer } from 'mobx-react';
import Link from 'next/link';
import { Component } from 'react';
import PopularTracks from './popular-tracks';

interface IProps {
	store?: any;
}

class Index extends Component<IProps> {
	public render() {
		return <PopularTracks />;
	}
}

export default inject(({ store }) => ({ store }))(observer(Index));
