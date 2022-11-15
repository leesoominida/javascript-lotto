const MissionUtils = require("@woowacourse/mission-utils");
const Console = require("./Console");
const Lotto = require("./Lotto");
const Validation = require("./Validation");
const { THREE, FOUR, FIVE, BONUS, SIX } = require("./Constant");

class App {
  constructor(){
    this.lottos = [];
    this.winningNums = [];
    this.bonusNum = null;
    this.winningResult = {
      [THREE]: 0,
      [FOUR]: 0,
      [FIVE]: 0,
      [BONUS]: 0,
      [SIX]: 0,
    };
  }

  play() {
    Console.askAnswer(Console.ASK_PAYMENT, (payment) => {
      Validation.isValidatePay(Number(payment));

      const lottoCount = Lotto.getLottoCount(Number(payment));
      Console.print(`\n${lottoCount}${Console.ANNOUNCE_NUM}`);

      const lottos = this.getLottoNums(lottoCount);
      lottos.forEach(((lotto) => this.lottos.push(lotto)));
      Console.printLottos(this.lottos);

      this.askWinningNum();
    });
  }

  getWinningLottoCount(lotto, winningNum){
    return lotto.filter((number)=> winningNum.includes(number)).length;
  }

  getLottoNums(lottoCount){
    return Array.from(
      {length : lottoCount},
      () => new Lotto(MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6).sort((a, b) => (a > b ? 1 : -1 )))
    ).map((lotto)=>lotto.lottoNum);
  }

  askWinningNum(){
    Console.askAnswer("\n" + Console.ASK_WINNINGNUM, (winningNums)=>{
      Validation.isValidateNum(winningNums);

      this.winningNums = winningNums.split(",").map(Number).sort((a,b) => (a>b ? 1:-1));

      this.askBonusNum();
    });
  }

  askBonusNum(){
    Console.askAnswer("\n"+ Console.ASK_BONUSNUM, (bonusNum)=>{
      Validation.isValidateBonusNum(Number(bonusNum));
      this.bonusNum = Number(bonusNum);

      Console.print("\n" + Console.ANNOUNCE_STATIC);

      this.getWinningResult(this.lottos, this.winningNums, this.bonusNum, this.winningResult);
      this.printWinningResult(this.winningResult);

      const rate = this.getRate(this.lottos, this.winningResult);
      Console.print(`총 수익률은 ${rate}입니다.`);
    });
    Console.close();
  }

  getWinningResult(lottos, winningNum, bonusNum, winningResult){
    lottos.forEach((lotto) =>{
      const winningNumCount = this.getWinningLottoCount(lotto, winningNum);

      if(winningNumCount === 3){
        winningResult[THREE] += 1;
      }
      if(winningNumCount === 4){
        winningResult[FOUR] += 1;
      }
      if(winningNumCount === 5 && !lotto.includes(bonusNum)){
        winningResult[FIVE] += 1;
      }
      if(winningNumCount === 5){
        winningResult[BONUS] += 1;
      }
      if(winningNumCount === 6){
        winningResult[SIX] += 1;
      }
    });
  }

  printWinningResult(winningResult){
    Console.print(
      Object.entries(winningResult).map(([key, value]) => {
        return `${key}${value}개`; 
      }).join("\n")
    );
  }

  getRate(lottos, winningResult){
    const reward = winningResult[THREE]*5000 + 
                winningResult[FOUR]*50000 + 
                winningResult[FIVE]*1500000 + 
                winningResult[BONUS]*30000000 + 
                winningResult[SIX]*2000000000;
    const pay = lottos.length * 1000;

    if (pay === 0 ) return 0 + "%";
    const rate = reward / pay;
    if(rate > 1) return Math.rount(rate * 100) / 100 + "%";
    return rate *100 +"%";
  }

}

module.exports = App;
