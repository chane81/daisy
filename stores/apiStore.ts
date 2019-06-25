import { flow, Instance, types, applySnapshot } from 'mobx-state-tree';
import { getPlayListItems, getSearch } from '../apis/youtubeApi';
import apiItemsStore from './apiItemsStore';
import _ from 'lodash';

const model = types
	.model('apiModel', {
		/** 스토어 아이덴티티 */
		identifier: types.optional(types.identifier, 'apiModel'),

		/** 재생목록 */
		playlistItems: types.array(apiItemsStore.model)
	})
	.actions(self => ({
		/* 재생목록가져오기
		 * playlistId: 가져올 플레이리스트 ID
		 * maxResults: 최대 개수
		 */
		getPlayListItems: flow(function*(
			playlistId: string,
			maxResults: number
		) {
			// 명시적 초기화
			applySnapshot(self, defaultValue);

			// data get
			self.playlistItems = yield getPlayListItems(playlistId, maxResults);
		}),
		/**
		 * video 검색목록 가져오기
		 * searchText: 검색텍스트
		 * maxResults: 최대 개수
		 */
		getVideoSearch: flow(function*(
			searchText: string,
			maxResults: number
		) {
			// 명시적 초기화
			applySnapshot(self, defaultValue);

			// data get
			self.playlistItems = yield getSearch({ searchText, maxResults });
		}),
		/**
		 * channel 검색목록 가져오기
		 * searchText: 검색텍스트
		 * maxResults: 최대 개수
		 */
		getChannelSearch: flow(function*(
			searchText: string,
			maxResults: number
		) {
			// 명시적 초기화
			applySnapshot(self, defaultValue);

			// data get
			self.playlistItems = yield getSearch({
				searchText,
				maxResults,
				order: 'viewcount',
				type: 'channel'
			});
		}),
		/** 초기화 */
		setInit() {
			applySnapshot(self, defaultValue);
		}
	}));

const defaultValue = {
	identifier: 'apiModel',
	playItemList: []
};

const create = model.create(defaultValue);

const apiStore = {
	create,
	defaultValue,
	model
};

export type IApiModelType = Instance<typeof model>;

export default apiStore;
