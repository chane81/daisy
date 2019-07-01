import { inject, observer } from 'mobx-react';
import { Component } from 'react';
import Master from '../src/layout/Common/MasterLayout';

interface IProps {
	store?: any;
}

class ArtistList extends Component<IProps> {
	public render() {
		return <Master>가수별 리스트</Master>;
	}
}

export default inject(({ store }) => ({ store }))(observer(ArtistList));
