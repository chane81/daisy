import { inject, observer } from 'mobx-react';
import { Component } from 'react';
import AlbumList from '../components/album/AlbumList';
import Master from '../components/layout/Master';

interface IProps {
	store?: any;
}

class Index extends Component<IProps> {
	public render() {
		return (
			<Master>
				<AlbumList />
			</Master>
		);
	}
}

export default inject(({ store }) => ({ store }))(observer(Index));
