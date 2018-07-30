function MACalculator(strRICName) {
    this.m_strRICName = strRICName;
    this.Calculate = Calculate;
    this.MA5ValueArray = [];
    this.MA10ValueArray = [];
    this.MA20ValueArray = [];
    this.MA30ValueArray = [];

    function CalcMAValue(
    closePriceArray,
    nInterval,
    ResultArray) {

        var MAAve = [];
        for (i = 0; i < closePriceArray.length; i++) {
            var dSumPrice = 0.0;
            for (j = 0; j < nInterval; j++) {            
                if ((i + j) == closePriceArray.length) {
                    dSumPrice = dSumPrice / j;
                    break;
                }
                else {
                    dSumPrice = dSumPrice + closePriceArray[i + j];
                    if (nInterval - 1 == j) {
                        dSumPrice = dSumPrice / nInterval;
                    }
                }
            }

            MAAve.push(dSumPrice);
        }

        for (i = 0; i < MAAve.length; i++) {
            ResultArray.push(MAAve[MAAve.length - 1 - i]);
        }
    }

    function Calculate() {
        var priceObject = mapRICTimeSeriesPriceData.get(this.m_strRICName);
        var closePrice = [];

        var validClosePrice = [];
        var validPosition = [];
        for (i = 0; i < priceObject.length; i++) {
            if ((typeof (priceObject[i].close) != "undefined") && (typeof (priceObject[i].date) != "undefined")) {
                validClosePrice.push(priceObject[i].close);
                validPosition.push(i);
            }
        }

        for (i = 0; i <= validClosePrice.length - 1; i++) {
            closePrice.push(validClosePrice[validClosePrice.length - 1 - i]);
        }

        var ma5Result = [];
        var ma10Result = [];
        var ma20Result = [];
        var ma30Result = [];
        CalcMAValue(closePrice, 5, ma5Result);
        CalcMAValue(closePrice, 10, ma10Result);
        CalcMAValue(closePrice, 20, ma20Result);
        CalcMAValue(closePrice, 30, ma30Result);

        for (i = 0, j = 0; i < priceObject.length; i++) {
            if (i == validPosition[j]) {
                this.MA5ValueArray[i] = ma5Result[j];
                this.MA10ValueArray[i] = ma10Result[j];
                this.MA20ValueArray[i] = ma20Result[j];
                this.MA30ValueArray[i] = ma30Result[j];
                j++;
            }
        }
    }
}


