import { Instance, types } from 'mobx-state-tree';

// 유튜브 플레이어 모델
const model = types
	.model('playerModel', {
		/** 스토어 아이덴티티 */
		identifier: types.optional(types.identifier, 'playerModel'),
		player: types.optional(types.frozen(), null),
		videoId: types.string,
		opts: types.model({
			height: types.string,
			width: types.string,
			playerVars: types.model({
				autoplay: types.union(types.literal(0), types.literal(1)),
				controls: types.union(
					types.literal(0),
					types.literal(1),
					types.literal(2)
				)
			})
		})
	})
	.actions(self => ({
		setPlayer(player: any) {
			self.player = player;
		},
		setPlay() {
			self.player.playVideo();
		},
		setPause() {
			self.player.pauseVideo();
		},
		setStop() {
			self.player.stopVideo();
		},
		setVideoId(videoId: string) {
			self.videoId = videoId;
		}
	}));

const defaultValue = {
	identifier: 'playerModel',
	player: null,
	videoId: '',
	opts: {
		height: '300',
		width: '600',
		playerVars: {
			autoplay: 1 as 1,
			controls: 1 as 1
		}
	}
};

const create = model.create(defaultValue);

const playerStore = {
	create,
	defaultValue,
	model
};

export type IPlayerModelType = Instance<typeof model>;

export default playerStore;
