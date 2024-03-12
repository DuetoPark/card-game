import { CustomElemName } from "./constant.js";

export class GameCard extends HTMLElement {
  // NOTE: 내부 상태, 내부에서만 관리한다
  #isDisabled = false;

  connectedCallback() {
    this.classList.add("card");
    this.dataset.name = this.getAttribute("name");

    const imagePath = this.getAttribute("imagePath");

    this.innerHTML = `
        <img class="card-front" src="${imagePath}" alt="카드 앞면" />
        <img class="card-back" src="../img/question.svg" alt="카드 뒷면" />
    `;
  }

  // NOTE: 내부 상태를 보여주는 getter 함수
  // NOTE: 이런 구조를 사용하는 이유는 isDisabled(내부 상태)가 사용하는 곳들에서 값을 일괄적으로 바뀌게(한번에 통제할 수 있개) 만들기 위함이다.
  get isDisabled() {
    return this.#isDisabled;
  }

  flip() {
    this.classList.toggle("flip");
  }

  // NOTE: 내부 상태를 변경하는 함수
  disable() {
    // NOTE: 상태값 변경(setState와 유사)
    this.#isDisabled = true;
  }
}

customElements.define(CustomElemName.gameCard, GameCard);
