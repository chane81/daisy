# 유튜브 음악 플레이어 사이드프로젝트

# `구성`

- user interface library

  > react.js

  > next.js (ssr)

- type check compiler

  > typescript

- linter

  > tslint

- style

  > scss

- deploy

  > heroku

- source controller

  > git

- test
  > jest + enzyme

# 유튜브 미디어 서비스의 단위 큰것 -> 작은것

- ## 채널 > 플레이리스트 > 트렉리스트(Video List) > Video

# 컴포넌트들의 구성

- ## `components`(프리젠테이셔널 컴포넌트)
  - 프리젠테이셔널 컴포넌트들 모음
  - stateless 하다
  - 스타일(css, sass...) 에 대한 구성이 들어감
  - 다른 프리젠테이셔널 컴포넌트만 포함한다.

- ## `containers`(비즈니스 컴포넌트)
  - 프리젠테이셔널 컴포넌트에 대한 비즈니스 로직(mobx, redux...) 구성 컴포넌트
  - statefull 하다

- ## `layout`(프리젠테이셔널 + 비즈니스 컴포넌트 composed)
  - 컨테이너 컴포넌트, 프리젠테이셔널 컴포넌트를 가지고 구성 및 스타일링을 한다.
  - 최종 pages 컴포넌트에 대한 레이아웃 컴포넌트가 여기 포함된다(프리젠테이셔널한 컴포넌트임)
  - stateless 하다
  
- ## `pages`(최종 페이지)
  - 라우팅될 때 이 페이지를 읽게된다.
  - 라우팅명과 페이지명이 동일해야한다는 next.js 규칙이 있다.
  - statefull 하다
  - pages 의 프리젠테이셔널 컴포넌트는 layout 컴포넌트이다.

- ## `pages > layout > containers > components`

- `조합 예)`
  > A 컴포넌트(Presentation) + B 컴포넌트(Presentation) => `C 컴포넌트(Presentation)` 
  
  > C 컴포넌트(Presentation) => `C-1 컴포넌트(Container)`

  > C-1 컴포넌트(Container) + D 컴포넌트(Presentation) => `E 컴포넌트(Layout)`
  
  > E 컴포넌트(Layout) => `F 컴포넌트(Page)`


# `Next.js 에서의 _document 와 _app 의 차이` 중요하니 알아두자

- ## 공식문서 참조 URL

  > https://nextjs.org/docs/#custom-%3Cdocument%3E

- ## \_app.js

  - 페이지 변경간 레이아웃유지
  - 페이지 탐색시 상태유지
  - `componentDidCatch()`를 사용한 사용자 정의 오류 처리

    > componentDidCatch() 는 React.js 16 버전에서 추가된 것으로 컴포넌트가 렌더링 되는 도중 런타임 에러가 발생하면 호출되는 콜백 함수

    > 참고 문서: https://ko.reactjs.org/docs/react-component.html

  - 페이지에 추가적인 데이터 주입(예: GraphQL 쿼리 처리)

- ## \_document.js
  - 서버측 랜더링에서 사용
  - 초기 서버 측 렌더링 문서 마크 업을 변경하는 데 사용
  - `styled-components` 또는 `emotion`과 같은 css-in-js 라이브러리의 서버 측 렌더링을 구현하는 데 일반적으로 사용. styled-jsx는 기본적으로 Next.js에 포함되어 있음

# `mobx 디버깅 관련`

- ## 디버깅 코드 심기

  - 콘솔에 mst 디버깅을 나타내기 위해서는 onPatch를 이용
  - 크롬 mst 도구에 디버깅을 나타내기 위해 makeInspectable 를 이용
  - mobx 의 provider 가 위치해 있는 index 나 최상위 컴포넌트에 심으면 된다.

  ```js
    import makeInspectable from 'mobx-devtools-mst';
    import { onPatch } from 'mobx-state-tree';

    constructor(props) {
      super(props);

      this.store = initializeStore(props.isServer, props.initialState);

      // mst 디버깅 로그
      if (process.env.NODE_ENV === 'development') {
        // 크롬 console 에 해당값의 변화가 있을 때 나타나게 함
        onPatch(this.store, (patch) => {
          console.log(patch);
        });

        // 크롬 mobx tools 에 MST 로 상태변화를 볼 수 있게 한다.
        makeInspectable(this.store);
      }
    }
  ```

# `Dynamic Routes 관련`

- ## next.js 에서 `/channer-playlist:id` 와 같이 restful 라우트를 쓰고자 할 때 설정
  - 참고 url
    > https://github.com/fridays/next-routes\
  - 이슈사항
    > https://github.com/fridays/next-routes/issues/133
  - yarn 설치
    > yarn add next-routes
  - 라우트설정 파일 생성
    > /config/routes.js 참고
    ```js
    /**
     * @typedef { import("next-routes").Registry } Registry}
    */
    const nextRoutes = require('next-routes');
                                                 
    /**
     * @type {Registry}
    */                                                  // Name   Page      Pattern
    const routes = (module.exports = nextRoutes());     // ----   ----      -----
    routes
    .add('about')                                       // about  about     /about
    .add('blog', '/blog/:slug')                         // blog   blog      /blog/:slug
    .add('user', '/user/:id', 'profile')                // user   profile   /user/:id
    .add('/:noname/:lang(en|es)/:wow+', 'complex')      // (none) complex   /:noname/:lang(en|es)/:wow+
    .add({name: 'beta', pattern: '/v3', page: 'v3'})    // beta   v3        /v3
    ```
  - server.js 파일 생성
    ```js
    const routes = require('./config/routes');
    const next = require('next');
    const port = parseInt(process.env.PORT, 10) || 3000;
    const dev = process.env.NODE_ENV !== 'production';
    const nextApp = next({ dev });
    const nextHandler = routes.getRequestHandler(nextApp);

    nextApp.prepare().then(() => {
      const server = require('express');

      server().use(nextHandler).listen(port, err => {
        if (err) throw err
        console.log(`> Ready on port: ${port}`)
      });
    });
    ```
  - package.json 설정
    > `"dev": "next"` => `"dev": "node server.js"` 으로 변경

# `testing 관련`

- ## jest + enzyme 사용
  - yarn 설치
    ```
      yarn add jest jest-dom enzyme enzyme-adapter-react-16 @types/enzyme @types/enzyme-adapter-react-16 @types/jest --dev
    ```
  - package.json 에 jest 관련 설정 추가

# `style 사용방식 참고`

- ## styled component

  - yarn

    ```
      // sass 쓰기 위해 node-sass 추가
      yarn add node-sass

      // 스타일 컴포넌트 패키지 추가
      yarn add styled-components
      yarn add babel-plugin-styled-components @types/styled-components --dev
    ```

  - .babelrc

    ```json
      "plugins": [["styled-components", { "ssr": true }]]
    ```

  - pages 폴더에 `_document.tsx` 파일 추가하고 아래 로직 추가

    ```js
      import Document, { NextDocumentContext } from 'next/document';
      import { ServerStyleSheet } from 'styled-components';

      export default class MyDocument extends Document {
        public static async getInitialProps(ctx: NextDocumentContext) {
          const sheet = new ServerStyleSheet();
          const originalRenderPage = ctx.renderPage;

          try {
            ctx.renderPage = () =>
              originalRenderPage({
                enhanceApp: (App) => (props) =>
                  sheet.collectStyles(<App {...props} />)
              });

            const initialProps = await Document.getInitialProps(ctx);

            return {
              ...initialProps,
              styles: (
                <>
                  {initialProps.styles}
                  {sheet.getStyleElement()}
                </>
              ),
            }
          } finally {
            sheet.seal();
          }
        }
      }
    ```

- ## 미디어쿼리 유틸(include-media)

  - 참고 문서 URL
    > https://include-media.com/
  - 사용방법

    ```css
    $breakpoints: (
    	small: 320px,
    	medium: 768px,
    	large: 1024px
    );

    @include media('>medium', '<=large') {
    	width: 100%;
    }
    ```

# 유틸

- ## 이미지의 변수화(next-images)

  - 참고 URL
    > https://github.com/twopluszero/next-images
  - yarn
    > yarn add next-image
  - next.config.js 설정

    ```js
    const withImages = require('next-images');

    module.exports = withPlugins([[withSourceMaps], [withImages]], {
    	webpack(config, options) {
    		return config;
    	}
    });
    ```

  - 사용1 - 변수화

    ```js
    import img from './my-image.jpg';

    export default () => (
    	<div>
    		<img src={img} />
    	</div>
    );
    ```

  - 사용2 - 이미지URL Prefix

    ```jsx
    // next.config.js
    const withImages = require('next-images');

    module.exports = withImages({
    	assetPrefix: 'https://example.com',
    	webpack(config, options) {
    		return config;
    	}
    });

    module.exports = withPlugins(
    	[
    		[withSourceMaps],
    		[
    			withImages,
    			{
    				assetPrefix: 'https://example.com'
    			}
    		]
    	],
    	{
    		webpack(config, options) {
    			return config;
    		}
    	}
    );
    ```

# webpack 설정 관련

- ## uglifyjs-webpack-plugin

  - 파일용량을 줄이는 라이브러리
  - 빌드시에 주로 실서버 배포시에 용량을 줄여야하니 개발모드에서는 할 필요가 없다.
  - yarn 설치
    > yarn add uglifyjs-webpack-plugin --dev
  - webpack 내에서 plugins 쪽에서 설정을 넣어준다
  - next.config.js 의 경우 아래와 같이 추가

    ```js
    webpack: (config, options) => {
    	const originalEntry = config.entry;

    	config.plugins = config.plugins || [];

    	config.plugins = [
    		...config.plugins,
    		new webpack.optimize.UglifyJsPlugin({
    			sourceMap:
    				options.devtool &&
    				(options.devtool.indexOf('sourcemap') >= 0 ||
    					options.devtool.indexOf('source-map') >= 0)
    		})
    	];
    };
    ```

- ## 빌드시 uglify, source-map 설정을 위한 설명

  - 빌드시에 uglify 즉, 소스난독화를 하여 압축된 파일로 정적파일을 생성할 때 디버깅을 위한 source-map 파일을 만들게 된다.
  - 소스난독화 설정

    > 'terser-webpack-plugin' 라는 라이브러리 설치와 웹팩 설정이 필요하다.

    > `옵션에서 'sourceMap: true' 를 주어도 '@zeit/next-source-maps' 라이브러리 설치/설정이 되어있지 않다면 source-map 파일은 생성이 되지 않는다.`

  - source-map 파일 생성 설정

    > source-map 파일을 생성을 위해 '@zeit/next-source-maps' 라는 라이브러리의 설치와 웹팩 설정이 필요하다.
    > yarn add @zeit/next-source-maps

  - 웹팩 설정(next.config.js)

    ```js
    const TerserPlugin = require('terser-webpack-plugin');
    const withSourceMaps = require('@zeit/next-source-maps');

    module.exports = withSourceMaps({
    	webpack: (config, options) => {
    		// 코드 난독화/압축화
    		if (!options.dev && !options.isServer) {
    			config.optimization.minimizer = [
    				new TerserPlugin({
    					parallel: true,
    					sourceMap: true
    				})
    			];
    		}

    		return config;
    	}
    });
    ```

  - 주의사항

    - 위의 설정대로 다 하여도 설정대로 파일이 생성이 안될 때가 있다.
    - ex) source-map 파일을 생성하지 않으려 하는데 dist 에는 생성이 되어 있는 경우
    - 기존 빌드파일들을 모두 다 제거하는 세팅을 하면 된다.

      > yarn add rimraf

    - package.json 설정

      ```json
      "scripts": {
        "build": "yarn clean && next build && next export -o dist",
        "clean": "rimraf dist/* .next/* "
      }
      ```

# `개발이슈`

- ## IE 에서의 find 에러

  > ![](/static/images/finderror_1.png)

  - 위의 그림과 같이 "개체가 'find' 속성이나 메서드를 지원하지 않습니다." 라는 에러 메시지가 IE 에서 확인이 되었다.(크롬이나 다른 브라우저에서는 나지 않음 -\_-)
  - core-js node_modules 를 찾아서 폴더를 열어보면 core-js/es6/array.js 에서 아래의 코드를 확인할 수 있다
    ```js
    require('../modules/es6.array.find');
    ```
  - 해당에러는 array.find 쪽 ie 지원에 관한 부분이므로 polyfills.js 에 es6.array 를 추가해 주었다.
  - symbol, number 는 덤으로 추가했다.

    ```js
    // 기존 polyfill import core-js
    import 'core-js/es6/set';
    import 'core-js/es6/map';
    import 'core-js/es7/array';

    // 추가된 polyfill import core-js
    import 'core-js/es6/symbol';
    import 'core-js/es6/array';
    import 'core-js/es6/number';
    ```

- ## MOBX Warning 메시지(크롬, IE, 기타 브라우저 모두 해당)

  > ![](/static/images/mobx_warning_1.png)

  - 위의 그림과 같이 process.env.NODE_ENV 가 번들러에서 세팅이 되어있지 않다 라는 경고 메시지가 나온다.
  - 이부분의 의미는 minify 했는데 이것은 'production'모드 에서 쓰이는 것이므로 'process.env.NODE_ENV' 가 세팅이 되어있지 않다라는 의미이다.
  - development 모드에서는 필요한 부분이 아니고 배포버전에서 'NODE_ENV' 가 세팅이 잘 되어있는지 체킹하는 부분이므로 env 환경설정에서 개발모드에서는 ignore 하도록 설정해주면 된다.
    ```js
    const envVal = {
    // 개발환경 변수
    development: {
      IGNORE_MOBX_MINIFY_WARNING: 'true',
      [기타설정]
    },
    // 실서버환경 변수
    production: {
      IGNORE_MOBX_MINIFY_WARNING: 'false',
      [기타설정]
    }
    ```
  - 체킹하는 mobx 모듈 설정부분
    - 모듈 위치:
      > \node_modules\mobx\lib\mobx.module.js
    - 모듈 해당 소스 부분:
      ```js
      if (
      	testCodeMinification.name !== 'testCodeMinification' &&
      	process.env.NODE_ENV !== 'production' &&
      	process.env.IGNORE_MOBX_MINIFY_WARNING !== 'true'
      ) {
      	// trick so it doesn't get replaced
      	var varName = ['process', 'env', 'NODE_ENV'].join('.');
      	console.warn(
      		"[mobx] you are running a minified build, but '" +
      			varName +
      			"' was not set to 'production' in your bundler. This results in an unnecessarily large and slow bundle"
      	);
      }
      ```
- ## css-loader 이슈
  - 슬라이더효과를 쓰기 위해 아래와 같이 css 를 .scss 파일에 import 함
    ```css
    @import '~slick-carousel/slick/slick.css';
    @import '~slick-carousel/slick/slick-theme.css';
    ```
  - 아래와 같이 오류가 나온다.
    > ![](/static/images/cssloader_error.png)
  - 해당 이슈로 인해 `next.config.js` 에서 css-loader 의 옵션부분을 수정
  - css-loader 의 url 옵션을 false 로 변경
    ```js
    // 기존
    module.exports = withPlugins([
      [withSass]
    ])

    // 변경 후
    module.exports = withPlugins([
      [withSass, {
        cssLoaderOptions: {
          url: false
        }
      }],
    ])
    ```
  - 해당 이슈의 참고 url
    - 아직 명확한 이유는 찾지 못하고 해결만 한 상태다.
    > https://spectrum.chat/next-js/general/ignoring-folders-files-specifically-fonts~4f68cfd5-d576-46b8-adc8-86e9d7ea0b1f

- ## mobx 와 withRouter 를 같이 쓸 때 상태값을 제대로 못 가져오는 이슈
  - mobx 에서 axios 를 써서 데이터를 가져올 때 비동기에 대한 상태로 pending, success, fail 을 mobx 상태값으로 넣어주게 해놓았다.
  - mobx 에서는 pending -> success 로 상태값 update 하는것을 확인 하였으나 정작 컴포넌트에서는 아래 `[그림]`과 같이 pending 에서 success 로 바뀐 상태값을 가져오지 않았다.
  - 해결 방법
    > 아래와 같이 withRouter 를 mobx관련 hoc 바깥으로 묶어서 해결
      ```js
      // 문제가 있던 기존코드
      export default inject(({ store }) => ({ store }))(
        observer(withRouter(ChannelPlaylist))
      );

      // 문제 해결된 변경된 코드      
      export default withRouter(
        inject(({ store }) => ({ store }))(observer(ChannelPlaylist))
      );
      ```
  - `[그림]` - mobx 내부에서는 status 상태값 update 했으나 컴포넌트에서는 pending 상태에서 바뀌지 않음
    > ![](/static/images/mobx_withrouter_issue.png)


- ## 웹펙에서 소스난독화/압축화를 할 때 기존에는 uglify 플러그인을 썼지만 아래 그림과 같이 deprecated 가 되었다.

  > ![](/static/images/uglifyJsPlugin_deprecated_1.png)

  - 웹팩 optimization.minimizer 을 사용하여 TerserPlugin 을 add 하여 대체 함
  - 참고 URL
    > https://github.com/zeit/next.js/issues/5021
  - yarn
    > yarn add terser-webpack-plugin --dev
  - next.config.js 예제

    ```js
    const TerserPlugin = require('terser-webpack-plugin');
    const withSourceMaps = require('@zeit/next-source-maps');

    module.exports = withSourceMaps({
    	webpack: (config, { dev, isServer }) => {
    		if (!dev && !isServer) {
    			config.optimization.minimizer = [
    				new TerserPlugin({
    					parallel: true,
    					sourceMap: true
    				})
    			];
    		}

    		return config;
    	}
    });
    ```

# `서비스 url`
- ## heroku
  - https://daisy-app.herokuapp.com/

# `Screenshot`

- 실행화면

  > ![](/static/images/screen5.png)

  > ![](/static/images/screen2.png)
