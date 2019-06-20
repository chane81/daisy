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

# `heroku 클라이언트 URL`

- https://daisy-app.herokuapp.com/

# `Screenshot`

- 실행화면

  > ![](/static/images/screen2.png)

  > ![](/static/images/screen3.png)
