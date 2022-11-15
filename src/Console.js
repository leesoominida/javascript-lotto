const MissionUtils = require("@woowacourse/mission-utils");

class Console {
    static ASK_PAYMENT = "구입금액을 입력해 주세요.\n";
    static ANNOUNCE_NUM = "개를 구매했습니다.\n";
    static ASK_WINNINGNUM = "당첨 번호를 입력해 주세요.\n";
    static ASK_BONUSNUM = "보너스 번호를 입력해 주세요.\n";
    static ANNOUNCE_STATIC = "당첨 통계\n---";

    static print(message){
        MissionUtils.Console.print(message);
    }

    static close(){
        MissionUtils.Console.close();
    }

    static askAnswer(query, callback){
        MissionUtils.Console.readLine(query, callback);
    }

    static printLottos(lottos){
        lottos.forEach((lotto)=> Console.print(`[${lotto.join(", ")}]`));
      }
}

module.exports = Console;
