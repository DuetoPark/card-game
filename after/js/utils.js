export const suffleOrderArray = (arr) => {
  arr.forEach((_, _index) => {
    // randomIndex를 구한다
    const _randomIndex = Math.floor(Math.random() * arr.length);

    // 원래 index의 item과 randomIndex의 item 값을 서로 바꾼다
    [arr[_index], arr[_randomIndex]] = [arr[_randomIndex], arr[_index]];
  });
};
