class Validation {
    static isValidatePay(pay){
        if(pay % 1000 !== 0){
            throw new Error("[ERROR] 구입 금액은 1000원 단위여야 합니다.");
        }

        if(typeof pay !== "number"){
            throw new Error("[ERROR] 숫자를 입력하세요.");
        }

        if(pay <= 0){
            throw new Error("[ERROR] 구입 금액은 0원 이상이여야 합니다.")
        }

        return true;
    }

    static isValidateNum(winningNum){
        const winningNumArr = winningNum.split(",").map(Number);

        if(winningNumArr.length !== 6){
            throw new Error("[ERROR] 당첨 번호는 중복되지 않아야 합니다.");
        }

        if(new Set(winningNumArr).size !== 6){
            throw new Error("[ERROR] 당첨 번호는 중복되지 않아야 합니다.");
        }

        winningNumArr.forEach((number)=>{
            if(number < 1 || number > 45){
                throw new Error("[ERROR] 당첨 번호는 1 ~ 45를 벗어나지 않아야 합니다.");
            }
            if(isNaN(number)){
                throw new Error("[ERROR] 당첨 번호는 숫자여야 합니다.");
            }
        });

        return true;
    }

    static isValidateBonusNum(bonusNum){
        if(bonusNum < 1 || bonusNum > 45){
            throw new Error("[ERROR] 보너스 번호는 1 ~ 45를 벗어나지 않아야 합니다.");
        }
        if(isNaN(bonusNum)){
            throw new Error("[ERROR] 보너스 번호는 숫자여야 합니다.");
        }
        return true;
    }

}

module.exports = Validation;