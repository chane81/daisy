import { inject, observer } from 'mobx-react';
import { Component } from 'react';
import Master from '../src/components/Common/Master';

interface IProps {
	store?: any;
}

class TopRankList extends Component<IProps> {
	public render() {
		return <Master>탑100 리스트</Master>;
	}
}

export default inject(({ store }) => ({ store }))(observer(TopRankList));
