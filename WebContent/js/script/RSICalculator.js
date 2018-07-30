function RSICalculator(strRICName, nInterval) {
    this.m_strRICName = strRICName;
    this.m_nInterval = nInterval;
    this.Calculate = Calculate;
    this.RSI1ValueArray = [];
    this.RSI2ValueArray = [];
    this.RSI3ValueArray = [];

    function CalcRSIValue(
    risePriceArray,
    sumPriceArray,
    nInterval,
    RSIResultArray) {
        var nRisePriceCount = risePriceArray.length;
        var nSumPriceCount = sumPriceArray.length;
        if (nRisePriceCount <= 0 ||
            nSumPriceCount <= 0 ||
            nInterval <= 0 ||
            nRisePriceCount != nSumPriceCount) {
            return;
        }

        var riseAve = [];
        for (i = 0; i < nRisePriceCount; i++) {
            var dSumPrice = 0.0;
            for (j = 0; j < nInterval; j++) {            
                if ((i + j) == nRisePriceCount) {
                    dSumPrice = dSumPrice / j;
                    break;
                }
                else {
                    dSumPrice = dSumPrice + risePriceArray[i + j];
                    if (nInterval - 1 == j) {
                        dSumPrice = dSumPrice / nInterval;
                    }
                }
            }

            riseAve.push(dSumPrice);
        }

        var sumAve = [];
        for (i = 0; i < nSumPriceCount; i++) {
            var dSumPrice = 0.0;
            for (j = 0; j < nInterval; j++) {
                if ((i + j) == nSumPriceCount) {
                    dSumPrice = dSumPrice / j;
                    break;
                }
                else {
                    dSumPrice = dSumPrice + sumPriceArray[i + j];
                    if (nInterval - 1 == j) {
                        dSumPrice = dSumPrice / nInterval;
                    }
                }
            }
            sumAve.push(dSumPrice);
        }

        var reverseResult = [];
        for (i = 0; i < nSumPriceCount; i++) {
            var dRSIValue = riseAve[i] / sumAve[i];
            reverseResult.push(dRSIValue * 100);
        }

        for (i = 0; i < reverseResult.length; i++) {
            RSIResultArray.push(reverseResult[reverseResult.length - 1 - i]);
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

        var changePrice = [];
        var risePrice = [];
        var sumPrice = [];
             
        for (i = 0; i < closePrice.length; i++) {
            var dPrice = closePrice[i];
            if ((i + 1) < closePrice.length) {
                dPrice = closePrice[i] - closePrice[i + 1];
            }

            changePrice[i] = dPrice;
            if (dPrice >= 0) {
                risePrice.push(dPrice);
                sumPrice.push(dPrice);
            }
            else {
                risePrice.push(0);
                sumPrice.push(dPrice * -1);
            }
        }

        var rsi1Result = [];
        var rsi2Result = [];
        var rsi3Result = [];
        CalcRSIValue(risePrice, sumPrice, 6, rsi1Result);
        CalcRSIValue(risePrice, sumPrice, 12, rsi2Result);
        CalcRSIValue(risePrice, sumPrice, 24, rsi3Result);

        for (i = 0, j = 0; i < priceObject.length; i++) {
            if (i == validPosition[j]) {
                this.RSI1ValueArray[i] = rsi1Result[j];
                this.RSI2ValueArray[i] = rsi2Result[j];
                this.RSI3ValueArray[i] = rsi3Result[j];
                j++;
            }
        }
    }
}


