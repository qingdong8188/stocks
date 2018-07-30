function CCICalculator(strRICName, nInterval) {
    this.m_strRICName = strRICName;
    this.m_nInterval = nInterval;
    this.CCIValueArray = [];
    this.Calculate = Calculate;

    function Calculate() {
        var priceObject = mapRICTimeSeriesPriceData.get(this.m_strRICName);
        var closePrice = [];
        var highPrice = [];
        var lowPrice = [];

        var validClosePrice = [];
        var validHighPrice = [];
        var validLowPrice = [];
        var validPosition = [];
        for (i = 0; i < priceObject.length; i++) {
            if ((typeof (priceObject[i].close) != "undefined") &&
                (typeof (priceObject[i].high) != "undefined") &&
                (typeof (priceObject[i].low) != "undefined") &&
                (typeof (priceObject[i].date) != "undefined")) {
                validClosePrice.push(priceObject[i].close);
                validHighPrice.push(priceObject[i].high);
                validLowPrice.push(priceObject[i].low);
                validPosition.push(i);
            }
        }

        for (i = 0; i <= validClosePrice.length - 1; i++) {
            closePrice.push(validClosePrice[validClosePrice.length - 1 - i]);
        }

        for (i = 0; i <= validHighPrice.length - 1; i++) {
            highPrice.push(validHighPrice[validHighPrice.length - 1 - i]);
        }

        for (i = 0; i <= validLowPrice.length - 1; i++) {
            lowPrice.push(validLowPrice[validLowPrice.length - 1 - i]);
        }

        var avePrice = [];
        for (i = 0; i < closePrice.length; i++) {
            var aveValue = closePrice[i] + highPrice[i] + lowPrice[i];
            avePrice.push(aveValue / 3);
        }

        var maPrice = [];
        for (i = 0; i < avePrice.length; i++) {
            var dSumPrice = 0.0;
            for (j = 0; j < nInterval; j++) {
                if ((i + j) == avePrice.length) {
                    dSumPrice = dSumPrice / j;
                    break;
                }
                else {
                    dSumPrice = dSumPrice + avePrice[i + j];
                    if (nInterval - 1 == j) {
                        dSumPrice = dSumPrice / nInterval;
                    }
                }
            }
            maPrice.push(dSumPrice);
        }

        var difValue = [];
        for (i = 0; i < maPrice.length; i++) {
            difValue.push(avePrice[i] - maPrice[i]);
        }

        var mdValue = []
        for (i = 0; i < maPrice.length; i++) {
            var dSumPrice = 0.0;
            var dAvePrice = 0.0;
            for (j = 0; j < nInterval; j++) {
                if ((i + j) == avePrice.length) {
                    dAvePrice = dSumPrice / j;
                    break;
                }
                else {
                    var dTemp = avePrice[i + j] - maPrice[i];
                    if (dTemp < 0) {
                        dTemp = dTemp * -1;
                    }

                    dSumPrice = dSumPrice + dTemp;
                    if (nInterval - 1 == j) {
                        dAvePrice = dSumPrice / nInterval;
                    }
                }
            }
            mdValue.push(dAvePrice);
        }

        var reverseResultValue = [];
        for (i = 0; i < mdValue.length; i++) {
            var dTempValue = mdValue[i] * 0.015;
            var dCCIValue = difValue[i] / dTempValue;
            reverseResultValue.push(dCCIValue);
        }
        
        var cciResultValue = []
        for (i = 0; i < reverseResultValue.length; i++) {
            cciResultValue.push(reverseResultValue[reverseResultValue.length - 1 - i]);
        }

        for (i = 0, j = 0; i < priceObject.length; i++) {
            if (i == validPosition[j]) {
                this.CCIValueArray[i] = cciResultValue[j];
                j++;
            }
        }
    }
}


