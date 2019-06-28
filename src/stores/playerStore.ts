import { flow, Instance, types } from 'mobx-state-tree';

// 유튜브 플레이어 모델
const model = types
	.model('playerModel', {
		/** 스토어 아이덴티티 */
		identifier: types.optional(types.identifier, 'playerModel'),
		player: types.optional(types.frozen(), null),
		videoId: types.optional(types.string, ''),
		title: types.optional(types.string, ''),
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
		/**
		 *
		 * player:	 유튜브플레이어 객체
		 * videoId:		video 아이디
		 * title:			제목
		 */
		setPlayer({ player = null, videoId = '', title = '' }) {
			self.player = !!player ? player : self.player;
			self.videoId = !!videoId ? videoId : self.videoId;
			self.title = !!title ? title : self.title;
		},
		/** play */
		setPlay() {
			setTimeout(() => {
				self.player.playVideo();
			});
		},
		/** pause */
		setPause() {
			setTimeout(() => {
				self.player.pauseVideo();
			});
		},
		/** stop */
		setStop() {
			setTimeout(() => {
				self.player.stopVideo();
			});
		},
		/** 플레이어 높이, 넓이, 자동플레이, 컨트롤 visible 여부 설정 */
		setOpts(
			height?: string,
			width?: string,
			autoplay?: 0 | 1,
			controls?: 0 | 1 | 2
		) {
			if (!!height && self.opts.height !== height) {
				self.opts.height = height;
			}

			if (!!width && self.opts.width !== width) {
				self.opts.width = width;
			}

			if (!!autoplay && self.opts.playerVars.autoplay !== autoplay) {
				self.opts.playerVars.autoplay = autoplay;
			}

			if (!!controls && self.opts.playerVars.controls !== controls) {
				self.opts.playerVars.controls = controls;
			}
		}
	}));

const defaultValue = {
	identifier: 'playerModel',
	player: null,
	videoId: '',
	title: '',
	opts: {
		height: '300',
		width: '550',
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
