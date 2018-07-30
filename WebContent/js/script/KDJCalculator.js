function KDJCalculator(strRICName, nInterval) {
    this.m_strRICName = strRICName;
    this.m_nInterval = nInterval;
    this.KValueArray = [];
    this.DValueArray = [];
    this.JValueArray = [];
    this.Calculate = Calculate;

    function Calculate() {
        var closePrice = [];
        var highPrice = [];
        var lowPrice = [];
        var priceObject = mapRICTimeSeriesPriceData.get(this.m_strRICName);
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

        var tempHighPrice = [];
        for (i = 0; i < highPrice.length; i++) {
            var dPrice = 0.0;
            for (j = 0; j < nInterval; j++) {
                if ((i + j) == highPrice.length) {
                    break;
                }
                else {
                    if (dPrice < highPrice[i + j]) {
                        dPrice = highPrice[i + j]
                    }
                }
            }
            tempHighPrice.push(dPrice);
        }

        var tempLowPrice = [];
        for (i = 0; i < lowPrice.length; i++) {
            var dPrice = 10000000;
            for (j = 0; j < nInterval; j++) {
                if ((i + j) == lowPrice.length) {
                    break;
                }
                else {
                    if (dPrice > lowPrice[i + j]) {
                        dPrice = lowPrice[i + j]
                    }
                }
            }

            tempLowPrice.push(dPrice);
        }

        var RSVReverseValue = [];
        for (i = 0; i < tempHighPrice.length; i++) {
            var dTemp = tempHighPrice[i] - tempLowPrice[i];
            if (dTemp == 0) {
                RSVReverseValue.push(0);
            }
            else {
                var dTemp1 = closePrice[i] - tempLowPrice[i];
                var dRSV = dTemp1 * 100 / dTemp;
                RSVReverseValue.push(dRSV);
            }
        }

        var RSVValue = [];
        for (i = 0; i < RSVReverseValue.length; i++) {
            RSVValue.push(RSVReverseValue[RSVReverseValue.length - 1 - i]);
        }

        var kValueResult = [];
        var dValueResult = [];
        var jValueResult = [];
        for (i = 0; i < RSVValue.length; i++) {
            if (i == 0) {
                kValueResult.push(100 / 3 + RSVValue[i] / 3);
                dValueResult.push(100 / 3 + kValueResult[i] / 3);
                jValueResult.push(3 * kValueResult[i] - 2 * dValueResult[i]);
            }
            else {
                kValueResult.push(2 * kValueResult[i - 1] / 3 + RSVValue[i] / 3);
                dValueResult.push(2 * dValueResult[i - 1] / 3 + kValueResult[i] / 3);
                jValueResult.push(3 * kValueResult[i] - 2 * dValueResult[i]);
            }
        }

        for (i = 0, j = 0; i < priceObject.length; i++) {
            if (i == validPosition[j]) {
                this.KValueArray[i] = kValueResult[j];
                this.DValueArray[i] = dValueResult[j];
                this.JValueArray[i] = jValueResult[j];
                j++;
            }
        }
    }
}


