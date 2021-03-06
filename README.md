시연영상 ->  https://www.youtube.com/watch?v=teDdyzcDxe0

주제: MongoDB와 react reducer를 이용한 여행상품 페이지 구성

개발환경: Vscode, git 
실행방법: yarn run dev 또는 npm run dev

참고 사이트
- https://ant.design/  antd (디자인 프레임워크)
- https://ko.reactjs.org/docs/getting-started.html - react document
- 인프런 존안(유료강의)


<목차>
1. 무엇을 만들었는가?
- 유튜브링크 : https://www.youtube.com/watch?v=teDdyzcDxe0

2. 어떤 식으로 구성하였는가?
- css: antd (직접 inline방식) - 매우 불만족, 하지만 빠르게 css적용 및 반응형이 쉽게 구현
- JS: React(useState, reducer) and MongoDB, express, +  nodejs
3. 무엇을 배웠는가?
- MongoDB를 통해 데이터 처리하는법
- 미들웨어와 HOC적용
- React를 통한 데이터 전달(axios)
- antd css 디자인 방법


4. 고쳐야 할 것은 무엇인가?
- User입장에서 Delay가 느껴진다. -> 보다 더 Module화 하고 세분화하여 유저에게 편안함을 줄 수 있다.
ex) React.memo, useCallback, useRef와 같은 리렌더링 방지!
- 개발자 입장으로서 유지보수하기 용이하지않다.
왜? css가 다 inline이니까
- styled-components를 이용하든 css파일을 만들든 파일관리가 필요
- prop-types와 같은 방법을 통해 데이터 타입을 검증할 필요가있다. (안정성을 위함)
- 이미지가 null일 때 유효성 처리가 안됨.
- useState대신 custom hook함수를 이용하여 효율성을 올릴 필요가 있으며 button 역시 module화가 필요!
반복되는 코드를 간결화시킬 필요가있다.