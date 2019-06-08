import { inject, observer } from 'mobx-react';
import React from 'react';
import { Component } from 'react';
import Master from '../components/layout/Master';

interface IProps {
	store?: any;
}

class AlbumListContainer extends Component<IProps> {
	public render() {
		return <Master>앨범 리스트</Master>;
	}
}

export default inject(({ store }) => ({ store }))(observer(AlbumList));
