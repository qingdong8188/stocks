function RankingCalculator(strRICName) {
    this.m_strRICName = strRICName;
    this.CCIRanking = CCIRanking;
    this.RSIRanking = RSIRanking;
    this.KDJRanking = KDJRanking;
    this.LLV = LLV;
    this.REF = REF;
    this.CROSS = CROSS;

    function CCIRanking(
        CCIArray) {
        //var nInternal = 14;
        //var priceObject = mapRICTimeSeriesPriceData.get(this.m_strRICName);
        //var closePrice = [];
        //for (i = 0; i <= priceObject.length - 1; i++) {
        //    closePrice.push(priceObject[priceObject.length - 1 - i].NDA_LAST);
        //}
        
        //var CCILength = CCIArray.length;
        //var CloseLength = closePrice.length;
        //var MinRange = 2 * nInternal + 1;
        //if (CCILength < MinRange ||
        //    CloseLength < MinRange) {
        //    return 0;
        //}

        //var PreCCI = CCIArray[CCILength - 1 - nInternal];
        //var PreLLVCCI = LLV(CCIArray, MinRange);
        //if (PreCCI != PreLLVCCI) {
        //    return 0;
        //}

        //var PreClose = closePrice[CloseLength - 1 - nInternal];

        //var TodayCCI = CCIArray[CCILength - 1];
        //var TodayLLVCCI = LLV(CCIArray, nInternal + 1);
        //if (TodayCCI != TodayLLVCCI) {
        //    return 0;
        //}

        //var TodayClose = closePrice[CloseLength - 1];
        //if ((PreClose > TodayClose) && (PreCCI < TodayCCI)) {
        //    return 1;
        //}
        var priceObject = mapRICTimeSeriesPriceData.get(this.m_strRICName);
        if (typeof (priceObject[priceObject.length - 1].close) == "undefined") {
            return 0;
        }

        for (i = 0; i < CCIArray.length; i++) {
            var CCIValueLength = CCIArray.length;
            if (CCIValueLength > 2) {
                var CCIValue1 = CCIArray[CCIValueLength - 1];
                var CCIValue2 = CCIArray[CCIValueLength - 2];
                if ((CCIValue1 > CCIValue2) && (CCIValue1 > 50.0)) {
                    return 1;
                }
            }
        }

        return 0;
    }

    function RSIRanking(
        RSI1Array,
        RSI2Array,
        RSI3Array) {

        var priceObject = mapRICTimeSeriesPriceData.get(this.m_strRICName);
        if (typeof (priceObject[priceObject.length - 1].close) == "undefined") {
            return 0;
        }

        var RSI1Length = RSI1Array.length;
        var RSI2Length = RSI2Array.length;
        var RSI3Length = RSI3Array.length;
        if (RSI1Length < 2 ||
            RSI1Length < 2 ||
            RSI1Length < 2){
            return 0;
        }

        var cross1 = CROSS(RSI1Array[RSI1Length - 1], RSI1Array[RSI1Length - 2], RSI2Array[RSI2Length - 1], RSI2Array[RSI2Length - 2]);
        var cross2 = CROSS(RSI1Array[RSI1Length - 1], RSI1Array[RSI1Length - 2], RSI3Array[RSI3Length - 1], RSI3Array[RSI3Length - 2]);
        var range = 0;
        if ((RSI1Array[RSI1Length - 1] > RSI2Array[RSI2Length - 1]) &&
            (RSI2Array[RSI2Length - 1] > RSI3Array[RSI3Length - 1])) {
            range = 1;
        }

        if (cross1 == 0 ||
            cross2 == 0 ||
            range == 0) {
            return 0;
        }

        return 1;
    }

    function KDJRanking(
        KArray,
        JArray) {

        var priceObject = mapRICTimeSeriesPriceData.get(this.m_strRICName);
        if (typeof (priceObject[priceObject.length - 1].close) == "undefined") {
            return 0;
        }

        var KLength = KArray.length;
        var JLength = JArray.length;
        if (KLength < 5 ||
            JLength < 5 ) {
            return 0;
        }

        var condition1 = 0;
        for (i = JLength - 1; i >= JLength - 5; i--) {
            if (JArray[i] < 0) {
                condition1 = 1;
                break;
            }
        }

        var condition2 = 0;
        condition2 = CROSS(JArray[JLength - 1], JArray[JLength - 2], KArray[KLength - 1], KArray[KLength - 2]);

        if (condition1 == 0 ||
            condition2 == 0) {
            return 0;
        }

        return 1;
    }

    function LLV(
        valueArray,
        nRange) {
        var RangeValue = [];
        var nLength = valueArray.length;
        for (i = nLength - 1; i >= 0; i--) {
            RangeValue.push(valueArray[i]);
        }

        var nMinValue = 10000000;
        for (i = 0; i < RangeValue.length; i++) {
            if (nMinValue > RangeValue[i]) {
                nMinValue = RangeValue[i];
            }
        }

        return nMinValue;
    }

    function REF(
        valueArray,
        nCycle) {
        var RangeValue = [];
        var nLength = valueArray.length;
        for (i = nLength - 1; i >= 0; i--) {
            RangeValue.push(valueArray[i]);
        }

        var nMinValue = 10000000;
        for (i = 0; i < RangeValue.length; i++) {
            if (nMinValue > RangeValue[i]) {
                nMinValue = RangeValue[i];
            }
        }

        return nMinValue;
    }

    function CROSS(
        Value1,
        preValue1,
        Value2,
        preValue2) {
        if ((preValue1 < preValue2) && (Value1 > Value2)) {
            return 1;
        }
        else {
            return 0;
        }
    }
}


