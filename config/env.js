/**
 * 사용자 config 세팅 여기서 함(.env 에서 설정하던 방식에서 변경)
 */

 /**
	* envVal 의 환경변수 key, value 를 process.env.key = value 형태로 파싱
  */
function getParse(val) {
  return Object.keys(val).reduce((env, key) => 
    Object.assign({}, env, {
      [`process.env.${key}`]: JSON.stringify(val[key])
    }), {});
}

/**
 * 환경변수 key, value 세팅
 */
function getClientConfig() {
  const target = process.env.npm_lifecycle_event;
  process.env.NODE_ENV = target === 'build' ? 'production' : 'development';

	const envVal = {
    // 개발환경 변수
		development: {
      JWT_PRIVATE_KEY: 'dev9254',
      YOUTUBE_API_BASE_URL: 'https://www.googleapis.com/youtube/v3',
      YOUTUBE_API_KEY: 'AIzaSyDp1dL6gomS_0dMQZyKsgTBkdTB9xGwBHQ'
    },
    // 실서버환경 변수
		production: {
      JWT_PRIVATE_KEY: 'black2284',
      YOUTUBE_API_BASE_URL: 'https://www.googleapis.com/youtube/v3',
      YOUTUBE_API_KEY: 'AIzaSyDp1dL6gomS_0dMQZyKsgTBkdTB9xGwBHQ'
		}
	};

  // 실행환경
	// 'development' or 'production'
  const raw = envVal[process.env.NODE_ENV || 'development'];

  // env 에 사용자 config 변수값 삽입
  const stringified = getParse(raw);

  // console.log('target:', process.env.npm_lifecycle_event);
  // console.log('stringified:', stringified);

  return { raw, stringified };
}

module.exports = getClientConfig;
