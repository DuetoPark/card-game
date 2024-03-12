/**
 * [Board]
 * 카드 섞기 (Suffle)
 * 카드 매칭 확인
 * 맞은 카드는 disabled
 * 틀린 카드는 unflip

 * [Card]
 * flip

 */

let $firstCard, $secondCard;
let _hasFlippedCard = false;
let _lockBoard = false;

const _orderList = [0, 1, 2, 3];

const suffleOrderArray = (arr) => {
  arr.forEach((_, _index) => {
    // randomIndex를 구한다
    const _randomIndex = Math.floor(Math.random() * arr.length);

    // 원래 index의 item과 randomIndex의 item 값을 서로 바꾼다
    [arr[_index], arr[_randomIndex]] = [arr[_randomIndex], arr[_index]];
  });
};

const suffle = () => {
  // suffle된 orderList의 값을 카드의 order에 설정한다.
  suffleOrderArray(_orderList);

  document.querySelectorAll(".card").forEach(($card, _index) => {
    $card.style.order = _orderList[_index];
  });
};

const resetBoard = () => {
  $firstCard = null;
  $secondCard = null;

  _lockBoard = false;
  _hasFlippedCard = false;
};

const disabledCard = () => {
  $firstCard.removeEventListener("click", flipCard);
  $secondCard.removeEventListener("click", flipCard);
};

const unflipCard = () => {
  _lockBoard = true;

  setTimeout(() => {
    $firstCard.classList.remove("flip");
    $secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);
};

const checkForMatch = () => {
  const _isMatch = $firstCard.dataset.name == $secondCard.dataset.name;

  _isMatch ? disabledCard() : unflipCard();
};

function flipCard() {
  if (_lockBoard) return;

  // 동일 카드를 2번 클릭한 경우
  if ($firstCard == this) return;

  // 카드를 뒤집기
  this.classList.toggle("flip");

  // 클릭된 카드가 없는 경우
  if (!_hasFlippedCard) {
    $firstCard = this;
    _hasFlippedCard = true;
    return;
  }

  // 클릭된 카드가 있는 경우
  $secondCard = this;
  _hasFlippedCard = false;

  // 비교
  checkForMatch();
}

window.addEventListener("load", () => {
  suffle();

  document.querySelectorAll(".card").forEach(($card) => {
    $card.addEventListener("click", flipCard);
  });
});
