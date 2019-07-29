import { flow, Instance, types, applySnapshot } from 'mobx-state-tree';
import {
	getPlayListItems,
	getSearch,
	getChannelPlaylist,
	getChannelBaseInfo
} from '../apis/youtubeApi';
import apiItemsStore from './apiItemsStore';
import apiTrackListStore from './apiTrackListStore';
import apiChannelInfoStore from './apiChanneInfoStore';
import statusStore from './statusStore';
import _ from 'lodash';
import MyApp from '../../pages/_app';
import { IApiTrackListModelType } from './apiTrackListStore';
import { IApiChannelInfoModelType } from './apiChanneInfoStore';

const model = types
	.model('apiModel', {
		/** 스토어 아이덴티티 */
		identifier: types.optional(types.identifier, 'apiModel'),

		/** 트렉 리스트 */
		trackList: apiTrackListStore.model,

		/** 채널 정보 */
		channelInfo: types.optional(
			apiChannelInfoStore.model,
			apiChannelInfoStore.defaultValue
		),

		/** 채널 리스트 */
		channelList: types.array(apiItemsStore.model),

		/** api call 상태: pending, success, fail */
		status: types.optional(statusStore.model, statusStore.defaultValue)
	})
	.actions(self => ({
		/**
		 * 채널 정보 가져오기
		 * channelId: 채널ID
		 * maxResults: 플레이리스트 최대 개수
		 */
		getChannelInfo: flow(function*(channelId: string, maxResults: number) {
			self.status.setStatus('pending');

			try {
				// Promose All
				const promiseResult = yield Promise.all([
					// 채널 기본정보 가져오기 - 타이틀, 구독자수 등
					getChannelBaseInfo(channelId),

					// 채널 플레이리스트 가져오기 - 플레이리스트ID 포함, 여러개의 트랙정보
					getChannelPlaylist(channelId, maxResults)
				]);

				// 상태값 주입
				self.channelInfo = {
					identifier: 'apiChannelInfoModel',
					baseInfo: promiseResult[0],
					playList: promiseResult[1]
				};

				console.log('channelInfo:', self.channelInfo);

				self.status.setStatus('success');
			} catch (err) {
				self.status.setError(err);
			}

			// self.channelInfo.baseInfo = channelSimpleData;
			// self.channelInfo.playList = channelPlayList;

			// console.log('getChannelInfo:', self.channelInfo);
		}),
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
				self.trackList.tracks = yield getPlayListItems(
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
				self.trackList.tracks = yield getSearch({
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
	trackList: apiTrackListStore.defaultValue,
	channelInfo: apiChannelInfoStore.defaultValue,
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
