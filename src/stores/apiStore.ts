import { flow, Instance, types, applySnapshot } from 'mobx-state-tree';
import {
	getPlayListItems,
	getSearch,
	getChannelPlaylist
} from '../apis/youtubeApi';
import apiItemsStore from './apiItemsStore';
import apiTrackListStore from './apiTrackListStore';
import apiChannelStore from './apiChannelStore';
import statusStore from './statusStore';
import _ from 'lodash';

const model = types
	.model('apiModel', {
		/** 스토어 아이덴티티 */
		identifier: types.optional(types.identifier, 'apiModel'),

		/** 인기트렉 리스트 */
		popularTrackList: apiTrackListStore.model,

		/** 채널 정보 */
		channelInfo: apiChannelStore.model,

		/** 채널 리스트 */
		channelList: types.array(apiChannelStore.model),

		/** api call 상태: pending, success, fail */
		status: types.optional(statusStore.model, statusStore.defaultValue)
	})
	.actions(self => ({
		// /**
		//  * 채널의 플레이리스트들 가져오기
		//  * channelId: 채널ID
		//  * maxResults: 최대 개수
		//  */
		// getChannelPlaylist: flow(function*(
		// 	channelId: string,
		// 	maxResults: number
		// ) {
		// 	// 명시적 초기화
		// 	applySnapshot(self, defaultValue);

		// 	// data get
		// 	self.apiItems = yield getChannelPlaylist(channelId, maxResults);
		// }),
		/**
		 * 재생목록가져오기
		 * playlistId: 가져올 플레이리스트 ID
		 * maxResults: 최대 개수
		 */
		getPlayListItems: flow(function*(
			playlistId: string,
			maxResults: number
		) {
			// 명시적 초기화
			// applySnapshot(self, defaultValue);
			self.status.setStatus('pending');

			try {
				// data get
				self.popularTrackList.tracks = yield getPlayListItems(
					playlistId,
					maxResults
				);

				self.status.setStatus('success');
			} catch (err) {
				self.status.setError(err);
			}
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
			self.status.setStatus('pending');

			try {
				// data get
				self.popularTrackList.tracks = yield getSearch({
					searchText,
					maxResults
				}).catch(err => {
					self.status.setError(err);
				});

				self.status.setStatus('success');
			} catch (err) {
				self.status.setError(err);
			}
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
			try {
				// data get
				self.channelList = yield getSearch({
					searchText,
					maxResults,
					order: 'viewcount',
					type: 'channel'
				});
			} catch (err) {
				self.status.setError(err);
			}
		}),
		/** 초기화 */
		setInit() {
			applySnapshot(self, defaultValue);
		}
	}));

const defaultValue = {
	popularTrackList: apiTrackListStore.defaultValue,
	channelInfo: apiChannelStore.defaultValue,
	channelList: [],
	status: statusStore.defaultValue
};

const create = model.create(defaultValue);

const apiStore = {
	create,
	defaultValue,
	model
};

export type IApiModelType = Instance<typeof model>;

export default apiStore;
