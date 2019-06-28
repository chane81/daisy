import { inject, observer } from 'mobx-react';
import { Component } from 'react';
import Master from '../src/components/Layout/Master';

interface IProps {
	store?: any;
}

class AlbumList extends Component<IProps> {
	public render() {
		return <Master>앨범 리스트</Master>;
	}
}

export default inject(({ store }) => ({ store }))(observer(AlbumList));
