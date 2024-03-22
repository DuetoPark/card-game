# 웹 컴포넌트로 카드게임 만들기

> 정말 PHP CodeIgnitor 환경에서 컴포넌트 구현이 불가능했을까? 라는 생각으로 시작한 프로젝트!

```
동적으로 컴포넌트 프린트하는 JS 프로젝트 제작

- 제작기간: 2024.03.08 ~ 2024.03.13
- 구현환경: Vanilla JS
- 배포방법: vercel
- 특징
  - 웹 컴포넌트
  - 체계적인 파일 구조
```

[🃏 card-game 🃏](https://card-game-liard.vercel.app/)

<details>
<summary>페이지 대표 이미지</summary>

<img width="1680" alt="스크린샷 2024-03-21 오후 4 20 39" src="https://github.com/DuetoPark/super-super-glue/assets/69448900/e56cced4-bce2-4226-8ac2-797f5505f9f9">
<img width="1680" alt="스크린샷 2024-03-21 오후 4 20 52" src="https://github.com/DuetoPark/super-super-glue/assets/69448900/6ee1acc4-c6e7-4682-8ea7-4935013d4c33">
</details>

<br/>

## 🦄 프로젝트 관리 방법

### 문제와 해결

[GitHub WIKI](https://github.com/DuetoPark/card-game/wiki)

<details>
<summary>GitHub WIKI 예시 이미지 및 링크</summary>

<img width="1246" alt="스크린샷 2024-03-21 오후 4 23 07" src="https://github.com/DuetoPark/super-super-glue/assets/69448900/b3db028f-1245-40b2-93a2-15ff211606a6">

#### 리팩토링

- [vanilla JS로 web component 구현](https://github.com/DuetoPark/card-game/wiki/vanilla-JS%EB%A1%9C-web-component-%EA%B5%AC%ED%98%84)
- [상수 관리](https://github.com/DuetoPark/card-game/wiki/%EC%83%81%EC%88%98-%EA%B4%80%EB%A6%AC)
- [기능별로 디렉토리 정리](https://github.com/DuetoPark/card-game/wiki/%EA%B8%B0%EB%8A%A5%EB%B3%84%EB%A1%9C-%EB%94%94%EB%A0%89%ED%86%A0%EB%A6%AC-%EC%A0%95%EB%A6%AC)

#### 그 외

- [카드가 뒤집히는 동안 어떻게 클릭 이벤트를 막지?](https://github.com/DuetoPark/card-game/wiki/%EC%B9%B4%EB%93%9C%EA%B0%80-%EB%92%A4%EC%A7%91%ED%9E%88%EB%8A%94-%EB%8F%99%EC%95%88-%EC%96%B4%EB%96%BB%EA%B2%8C-%ED%81%B4%EB%A6%AD-%EC%9D%B4%EB%B2%A4%ED%8A%B8%EB%A5%BC-%EB%A7%89%EC%A7%80%3F)
- [구조분해할당 진또배기로 사용하기](https://github.com/DuetoPark/card-game/wiki/%EA%B5%AC%EC%A1%B0%EB%B6%84%ED%95%B4%ED%95%A0%EB%8B%B9-%EC%A7%84%EB%98%90%EB%B0%B0%EA%B8%B0%EB%A1%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)

</details>

<br/>

## 🦁 프로젝트 구조

```
📂after
   ┣ 📂datas ---------------------------------- 카드 데이터
   ┣ 📂img ------------------------------------ assets(이미지)
   ┣ 📂js
   ┃ ┣ 📜gameBoard.js ------------------------- 기능(board)
   ┃ ┣ 📜gameCard.js -------------------------- 기능(card)
   ┃ ┗ 📜utils.js ----------------------------- 기능(common)
   ┣ 📜android-chrome-192x192.png
   ┣ 📜android-chrome-512x512.png
   ┣ 📜apple-touch-icon.png
   ┣ 📜favicon-16x16.png
   ┣ 📜favicon-32x32.png
   ┣ 📜favicon.ico
   ┣ 📜site.webmanifest
   ┣ 📜constant.js ---------------------------- 상수
   ┣ 📜index.html
   ┣ 📜main.js
   ┗ 📜style.css
```

<br/>

## 🎨 웹 컴포넌트 종류와 기능

### GameBoard

- 카드 데이터 호출
- 카드 생성
- 카드 무작위로 섞기
- 클릭 이벤트 설정
  - 매칭 확인
  - 초기화

### GameCard

- 카드 뒤집기

<br/>

### 예시코드

```javascript
// NTOE: js/gameBoard.js

#onClickCard(gameCard) {
  if (this.#lock) return;

  if (this.#firstCard == gameCard) return;

  /* NOTE
  - 게임카드 상태가 disabled 이면 동작하지마
  - gameCard는 웹 컴포넌트가 담긴 변수라서 메소드 사용 가능~!
  */
  if (gameCard.isDisabled) return;

  this.#lock = true;
  gameCard.flip(); // gameCard 컴포넌트의 메소드 flip 사용

  if (!this.#firstCard) {
    this.#firstCard = gameCard;
    this.#lock = false;
    return;
  }

  this.#secondCard = gameCard;
  this.#checkForMatch();
}
```

<br/>

## 🥕 사용된 JS 개념

- Web Component
- Class
- this
- Object.freeze
- import, export
