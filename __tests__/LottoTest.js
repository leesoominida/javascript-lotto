const Lotto = require("../src/Lotto");
const Validation = require("../src/Validation");

describe("로또 클래스 테스트", () => {
  test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow("[ERROR]");
  });

  // TODO: 이 테스트가 통과할 수 있게 구현 코드 작성
  test("로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow("[ERROR]");
  });

  // 아래에 추가 테스트 작성 가능
});

describe("입력 유효 테스트", () => {
  test("구입 금액이 1000 단위가 아니면 예외가 발생한다.", () =>{
    expect(() => {
      Validation.isValidatePay(43204);
    }).toThrow("[ERROR]");
  });

  test("구입 금액이 숫자가 아니면 예외가 발생한다.", () =>{
    expect(() => {
      Validation.isValidatePay("String");
    }).toThrow("[ERROR]");
  });

  test("구입 금액이 0 이하인 경우 예외가 발생한다.", () =>{
    expect(() => {
      Validation.isValidatePay(-5000);
    }).toThrow("[ERROR]");
  });

  test("당첨 번호가 숫자가 아니면 예외가 발생한다.", () =>{
    expect(() => {
      Validation.isValidateNum("String");
    }).toThrow("[ERROR]");
  });

  test("당첨 번호가 1~ 45 사이의 숫자가 아니면 예외가 발생한다.", () =>{
    expect(() => {
      Validation.isValidateNum("1, 2, 3, 4, 5, 100");
    }).toThrow("[ERROR]");
  });

  test("당첨 번호가 6개가 아니면 예외가 발생한다.", () =>{
    expect(() => {
      Validation.isValidateNum("1, 2, 3, 4, 5, 100");
    }).toThrow("[ERROR]");
  });
});