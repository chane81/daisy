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

# ``testing 관련`
- ## jest + enzyme 사용
  - yarn 설치
    ```
      yarn add jest jest-dom enzyme enzyme-adapter-react-16 @types/enzyme @types/enzyme-adapter-react-16 @types/jest --dev
    ```
  - package.json 에 jest 관련 설정 추가