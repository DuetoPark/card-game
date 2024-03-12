import { CustomElemName } from "./constant.js";
import { suffleOrderArray } from "./utils.js";

export class GameBoard extends HTMLElement {
  #cards = [];
  #level = {
    easy: 2,
    medium: 4,
    hard: 6,
  };
  #lock = false;
  #firstCard = null;
  #secondCard = null;

  async connectedCallback() {
    // call card data
    const cardInfoList = await this.#fetchCardInfoList(this.#level.easy);

    // create cards
    this.classList.add("board");
    this.#cards = this.#createCards(cardInfoList);

    // suffle card
    suffleOrderArray(this.#cards);
    this.append(...this.#cards);

    // set event
    this.#bindEvents();
  }

  #onClickCard(gameCard) {
    if (this.#lock) return;

    if (this.#firstCard == gameCard) return;

    /* NOTE
    - 게임카드 상태가 disabled 이면 동작하지마
    - gameCard는 웹 컴포넌트가 담긴 변수라서 메소드 사용 가능~!
    */
    if (gameCard.isDisabled) return;

    this.#lock = true;
    gameCard.flip();

    if (!this.#firstCard) {
      this.#firstCard = gameCard;
      this.#lock = false;
      return;
    }

    this.#secondCard = gameCard;
    this.#checkForMatch();
  }

  #resetSelection() {
    this.#firstCard = null;
    this.#secondCard = null;
    this.#lock = false;
  }

  #checkForMatch() {
    const _isMatch =
      this.#firstCard.dataset.name === this.#secondCard.dataset.name;

    if (_isMatch) {
      this.#firstCard.disable();
      this.#secondCard.disable();

      this.#resetSelection();
      return;
    }

    setTimeout(() => {
      this.#firstCard.flip();
      this.#secondCard.flip();

      this.#resetSelection();
    }, 1000);
  }

  #bindEvents() {
    this.addEventListener("click", (e) => {
      const $gameCard = e.target.closest(CustomElemName.gameCard);

      if (!$gameCard) return;
      this.#onClickCard($gameCard);
    });
  }

  #createCards(cardInfoList) {
    // NOTE: 2개씩 짝을 지어 만든다.
    return [...cardInfoList, ...cardInfoList].map((info) => {
      // NOTE: 야호 constant 지정하길 정말 잘했다~!
      const card = document.createElement(CustomElemName.gameCard);

      // NOTE
      // - game-card에서 this.getAttribute('name')이 유효하게 됨
      // - game-card에서 this.getAttribute('imagePath')이 유효하게 됨
      card.setAttribute("name", info.name);
      card.setAttribute("imagePath", info.imagePath);

      return card;
    });
  }

  async #fetchCardInfoList(count) {
    return await fetch("./cardData.json")
      .then((response) => response.json())
      .then((data) => data.slice(0, count));
  }
}

customElements.define(CustomElemName.gameBoard, GameBoard);
