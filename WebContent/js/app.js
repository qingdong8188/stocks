function jetInitialize() {
    var jetReadyCallback = function () {
        JET.information("JET is loaded and ready to be used");
    }

    var app = document.querySelector('jet-app');

    // The jet-load event is fired when JET has completed a successful handshake with the container.
    app.addEventListener('jet-load', jetReadyCallback);
}

function openquote(ric) {
    var data = {
        target: "popup", // open a popup window
        //location: { x: 300, y: 300, width: 400, height: 300 },
        name: "Quote Object", // open a Quote Object
        entities: [{
            type: "COMP",
            "RIC": ric // Symbol to use is TRI.N
        }]
    };
    JET.navigate(data);
}

function opencompany(ric) {
    var url = 'reuters://REALTIME/verb=CompanyData/ric=' + ric;
    JET.navigate({
        url: url
    })
}

function drawChartTR1(x, y1, chartNum) {
    var legends = ["Total Return Distribution"]; // setup legend  
    var listOfSeriesParams = new Array(); // setup series data  

    // start initialize data set of first series 
    var columns = [];
    columns.push({ Name: "X", Values: x }); // create x-axis column  
    columns.push({ Name: "Total Return Distribution", Values: y1 }); // create y-axis column  

    var seriesData = new TRWebchart_Bus.SeriesData(columns); // create series object from the column definition  
    var seriesParamObj = new TRWebchart_Shared.SeriesParam("series0",
            seriesData,
            TRWebchart_Bus.ChartType.Histogram2D,
            "X",
            ["Total Return Distribution"],
            "Y",
            0,
            false);
    seriesParamObj.setColorSharingCode("C1"); // optional  
    seriesParamObj.setShowLineGap(false); // optional  

    listOfSeriesParams.push(seriesParamObj);

    var chart = new TRWebchart_Bus.TRBusinessChart(chartNum);
    chart.setSeriesParams(listOfSeriesParams);
    chart.setXAxisType(TRWebchart_Bus.AxisType.Customized);
    chart.setYAxisType(TRWebchart_Bus.AxisType.Numeric);

    // optional, setting chart property  
    chart.setXAxisTitle("Date Rage");
    chart.setYAxisTitles(["Relative Frequency", "Relative Frequency"]);
    chart.setChartScheme(1); // 1 = charcoal 0 = pearl  
    chart.setRotateDegree(45);
    chart.setLegends(legends);
    chart.setChartTitle("Total Return Distribution", true);
    chart.setColorsPalette([
        { "Index": 1, "Color": "#00ccff" }
    ]); // override default color palette of data index 1, which is line, to use red color  
    //  

    chart.render(); // draw chart  
}

function drawChartMA(x, y1,y2,y3,y4,chartNum) {
    var legends = ["MA_1", "MA_2", "MA_3", "MA_4" ]; // setup legend  
    var listOfSeriesParams = new Array(); // setup series data  

    // start initialize data set of first series 
    var columns1 = [];
    columns1.push({ Name: "X", Values: x }); // create x-axis column  
    columns1.push({ Name: "MA_1", Values: y1 }); // create y-axis column  

    var seriesData1 = new TRWebchart_Bus.SeriesData(columns1); // create series object from the column definition  
    var seriesParamObj1 = new TRWebchart_Shared.SeriesParam("series0",
            seriesData1,
            TRWebchart_Bus.ChartType.Area2D,
            "X",
            ["MA_1"],
            "Y",
            0,
            false);
    seriesParamObj1.setColorSharingCode("C1"); // optional  
    seriesParamObj1.setShowLineGap(false); // optional  
    var balloption = { numberFormat: "#,###.0000", showLegendValue: true, updateLegendValue: true, updateLegendText: false, size: 4 };
    seriesParamObj1.setBouncyBallsOptions(balloption);

    listOfSeriesParams.push(seriesParamObj1);
     //start initialize data set of 2nd series 
    var columns2 = [];
    columns2.push({ Name: "X", Values: x }); // create x-axis column   
    columns2.push({ Name: "MA_2", Values: y2 }); // create y-axis column  
    var seriesData2 = new TRWebchart_Bus.SeriesData(columns2); // create series object from the column definition  
    var seriesParamObj2 = new TRWebchart_Shared.SeriesParam("series1",
            seriesData2,
            TRWebchart_Bus.ChartType.Area2D,
            "X",
            ["MA_2"],
            "Y",
            0,
            false);

    seriesParamObj2.setBouncyBallsOptions(balloption);
    listOfSeriesParams.push(seriesParamObj2);

    //start initialize data set of 3rd series 
    var columns3 = [];
    columns3.push({ Name: "X", Values: x }); // create x-axis column   
    columns3.push({ Name: "MA_3", Values: y3 }); // create y-axis column  
    var seriesData3 = new TRWebchart_Bus.SeriesData(columns3); // create series object from the column definition  
    var seriesParamObj3 = new TRWebchart_Shared.SeriesParam("series2",
            seriesData3,
            TRWebchart_Bus.ChartType.Area2D,
            "X",
            ["MA_3"],
            "Y",
            0,
            false);

    seriesParamObj3.setBouncyBallsOptions(balloption);
    listOfSeriesParams.push(seriesParamObj3);

    //start initialize data set of 4th series 
    var columns4 = [];
    columns4.push({ Name: "X", Values: x }); // create x-axis column   
    columns4.push({ Name: "MA_4", Values: y4 }); // create y-axis column  
    var seriesData4 = new TRWebchart_Bus.SeriesData(columns4); // create series object from the column definition  
    var seriesParamObj4 = new TRWebchart_Shared.SeriesParam("series3",
            seriesData4,
            TRWebchart_Bus.ChartType.Area2D,
            "X",
            ["MA_4"],
            "Y",
            0,
            false);

    seriesParamObj4.setBouncyBallsOptions(balloption);
    listOfSeriesParams.push(seriesParamObj4);

    var chart = new TRWebchart_Bus.TRBusinessChart(chartNum);
    chart.setSeriesParams(listOfSeriesParams);
    chart.setXAxisType(TRWebchart_Bus.AxisType.DateTime);
    chart.setYAxisType(TRWebchart_Bus.AxisType.Numeric);

    // optional, setting chart property  
    chart.setXAxisTitle("Date");
    chart.setChartScheme(1); // 1 = charcoal 0 = pearl  
    chart.setRotateDegree(45);
    chart.setLegends(legends);
    chart.setChartTitle("Moving Average", true);
    chart.enableBouncyBalls(true);

    chart.setYAxisTitles(["MA","MA","MA","MA"]);
    chart.setColorsPalette([
        { "Index": 0, "Color": "#00ccff" }
    ]); // override default color palette of data index 1, which is line, to use red color  
    //  

    chart.render(); // draw chart  
}

function drawChartRSI(x, y1,y2,y3,chartNum) {
    var legends = ["RSI_1","RSI_2","RSI_3"]; // setup legend  
    var listOfSeriesParams = new Array(); // setup series data  

    // start initialize data set of first series 
    var columns = [];
    columns.push({ Name: "X", Values: x }); // create x-axis column  
    columns.push({ Name: "RSI_1", Values: y1 }); // create y-axis column  

    var seriesData = new TRWebchart_Bus.SeriesData(columns); // create series object from the column definition  
    var seriesParamObj = new TRWebchart_Shared.SeriesParam("series0",
            seriesData,
            TRWebchart_Bus.ChartType.Area2D,
            "X",
            ["RSI_1"],
            "Y",
            0,
            false);
    seriesParamObj.setColorSharingCode("C1"); // optional  
    seriesParamObj.setShowLineGap(false); // optional  
    var balloption = { numberFormat: "#,###.0000", showLegendValue: true, updateLegendValue: true, updateLegendText: false, size: 4};
    seriesParamObj.setBouncyBallsOptions(balloption);

    listOfSeriesParams.push(seriesParamObj);

    // start initialize data set of 2nd series 
    var columns2 = [];
    columns2.push({ Name: "X", Values: x }); // create x-axis column   
    columns2.push({ Name: "RSI_2", Values: y2 }); // create y-axis column  
    var seriesData2 = new TRWebchart_Bus.SeriesData(columns2); // create series object from the column definition  
    var seriesParamObj2 = new TRWebchart_Shared.SeriesParam("series1",
            seriesData2,
            TRWebchart_Bus.ChartType.Area2D,
            "X",
            ["RSI_2"],
            "Y",
            0,
            false);

    seriesParamObj2.setBouncyBallsOptions(balloption);
    listOfSeriesParams.push(seriesParamObj2);

    // start initialize data set of 3rd series 
    var columns3 = [];
    columns3.push({ Name: "X", Values: x }); // create x-axis column   
    columns3.push({ Name: "RSI_3", Values: y3 }); // create y-axis column  
    var seriesData3 = new TRWebchart_Bus.SeriesData(columns3); // create series object from the column definition  
    var seriesParamObj3 = new TRWebchart_Shared.SeriesParam("series2",
            seriesData3,
            TRWebchart_Bus.ChartType.Area2D,
            "X",
            ["RSI_3"],
            "Y",
            0,
            false);

    seriesParamObj3.setBouncyBallsOptions(balloption);
    listOfSeriesParams.push(seriesParamObj3);

    var chart = new TRWebchart_Bus.TRBusinessChart(chartNum);
    chart.setSeriesParams(listOfSeriesParams);
    chart.setXAxisType(TRWebchart_Bus.AxisType.DateTime);
    chart.setYAxisType(TRWebchart_Bus.AxisType.Numeric);

    // optional, setting chart property  
    chart.setXAxisTitle("Date");
    chart.setChartScheme(1); // 1 = charcoal 0 = pearl  
    chart.setRotateDegree(45);
    chart.setLegends(legends);
    chart.setChartTitle("Relative Strength Index", true);
    chart.enableBouncyBalls(true);
    chart.setYAxisTitles(["RSI","RSI","RSI"]);
    chart.setColorsPalette([
        { "Index": 1, "Color": "#00ccff" }
    ]); // override default color palette of data index 1, which is line, to use red color  
    //  

    chart.render(); // draw chart  
}

function drawChartCCI(x, y1, chartNum) {
    var legends = ["CCI"]; // setup legend  
    var listOfSeriesParams = new Array(); // setup series data  

    // start initialize data set of first series 
    var columns = [];
    columns.push({ Name: "X", Values: x }); // create x-axis column  
    columns.push({ Name: "CCI", Values: y1 }); // create y-axis column  

    var seriesData = new TRWebchart_Bus.SeriesData(columns); // create series object from the column definition  
    var seriesParamObj = new TRWebchart_Shared.SeriesParam("series0",
            seriesData,
            TRWebchart_Bus.ChartType.Area2D,
            "X",
            ["CCI"],
            "Y",
            0,
            false);
    seriesParamObj.setColorSharingCode("C1"); // optional  
    seriesParamObj.setShowLineGap(false); // optional  
    var balloption = { numberFormat: "#,###.0000", showLegendValue: true, updateLegendValue: true, updateLegendText: false, size: 4 };
    seriesParamObj.setBouncyBallsOptions(balloption);

    listOfSeriesParams.push(seriesParamObj);
    // start initialize data set of 2nd series 
    //var columns2 = [];
    //columns2.push({ Name: "X", Values: x }); // create x-axis column   
    //columns2.push({ Name: "CCI", Values: y2 }); // create y-axis column  
    //var seriesData2 = new TRWebchart_Bus.SeriesData(columns2); // create series object from the column definition  
    //var seriesParamObj2 = new TRWebchart_Shared.SeriesParam("series1",
    //        seriesData2,
    //        TRWebchart_Bus.ChartType.Area2D,
    //        "X",
    //        ["CCI"],
    //        "Y1",
    //        0,
    //        false);

    //seriesParamObj2.setBouncyBallsOptions(balloption);
    //listOfSeriesParams.push(seriesParamObj2);

    var chart = new TRWebchart_Bus.TRBusinessChart(chartNum);
    chart.setSeriesParams(listOfSeriesParams);
    chart.setXAxisType(TRWebchart_Bus.AxisType.DateTime);
    chart.setYAxisType(TRWebchart_Bus.AxisType.Numeric);

    // optional, setting chart property  
    chart.setXAxisTitle("Date");
    chart.setChartScheme(1); // 1 = charcoal 0 = pearl  
    chart.setRotateDegree(45);
    chart.setLegends(legends);
    chart.setChartTitle("Commodity Channel Index", true);
    chart.enableBouncyBalls(true);

    chart.setYAxisTitles(["CCI","CCI"]);
    chart.setColorsPalette([
        { "Index": 1, "Color": "#00ccff" }
    ]); // override default color palette of data index 1, which is line, to use red color  
    //  

    chart.render(); // draw chart  
}

function drawChartKDJ(x, y0, y1, y2, chartNum) {
    var legends = ["K", "D", "J"]; // setup legend  
    var listOfSeriesParams = new Array(); // setup series data  

    var balloption = { numberFormat: "#,###.0000", showLegendValue: true, updateLegendValue: true, updateLegendText: false, size:4 };

    var columns0 = [];
    columns0.push({ Name: "X", Values: x }); // create x-axis column   
    columns0.push({ Name: "K", Values: y0 }); // create y-axis column  
    var seriesData0 = new TRWebchart_Bus.SeriesData(columns0); // create series object from the column definition  
    var seriesParamObj0 = new TRWebchart_Shared.SeriesParam("series0",
            seriesData0,
            TRWebchart_Bus.ChartType.Area2D,
            "X",
            ["K"],
            "Y0",
            0,
            false);
    seriesParamObj0.setColorSharingCode("C1");
    seriesParamObj0.setBouncyBallsOptions(balloption);
    listOfSeriesParams.push(seriesParamObj0);

    // start initialize data set of 2nd series 
    var columns1 = [];
    columns1.push({ Name: "X", Values: x }); // create x-axis column   
    columns1.push({ Name: "D", Values: y1 }); // create y-axis column  
    var seriesData1 = new TRWebchart_Bus.SeriesData(columns1); // create series object from the column definition  
    var seriesParamObj1 = new TRWebchart_Shared.SeriesParam("series1",
            seriesData1,
            TRWebchart_Bus.ChartType.Line2D,
            "X",
            ["D"],
            "Y0",
            0,
            false);
    seriesParamObj1.setColorSharingCode("C2");
    seriesParamObj1.setBouncyBallsOptions(balloption);
    listOfSeriesParams.push(seriesParamObj1);

    // start initialize data set of 2nd series 
    var columns2 = [];
    columns2.push({ Name: "X", Values: x }); // create x-axis column   
    columns2.push({ Name: "J", Values: y2 }); // create y-axis column  
    var seriesData2 = new TRWebchart_Bus.SeriesData(columns2); // create series object from the column definition  
    var seriesParamObj2 = new TRWebchart_Shared.SeriesParam("series2",
            seriesData2,
            TRWebchart_Bus.ChartType.Line2D,
            "X",
            ["J"],
            "Y0",
            0,
            false);
    seriesParamObj2.setColorSharingCode("C3");
    seriesParamObj2.setBouncyBallsOptions(balloption);
    listOfSeriesParams.push(seriesParamObj2);

    var chart = new TRWebchart_Bus.TRBusinessChart(chartNum);
    chart.setSeriesParams(listOfSeriesParams);
    chart.setXAxisType(TRWebchart_Bus.AxisType.DateTime);
    chart.setYAxisType(TRWebchart_Bus.AxisType.Numeric);

    // optional, setting chart property  
    chart.setXAxisTitle("Date");
    chart.setChartScheme(1); // 1 = charcoal 0 = pearl  
    chart.setRotateDegree(45);
    chart.setLegends(legends);
    chart.setChartTitle("KDJ", true);
    chart.enableBouncyBalls(true);

    chart.setYAxisTitles(["KDJ","KDJ","KDJ"]);
    chart.setColorsPalette([
        { "Index": 1, "Color": "#00ccff" }
    ]); // override default color palette of data index 1, which is line, to use red color  
    //  

    chart.render(); // draw chart  
}

function drawChartTR2(x, y1, chartNum) {
    var legends = ["Total Return"]; // setup legend  
    var listOfSeriesParams = new Array(); // setup series data  

    // start initialize data set of first series 
    var columns = [];
    columns.push({ Name: "X", Values: x }); // create x-axis column  
    columns.push({ Name: "Total Return", Values: y1 }); // create y-axis column  

    var seriesData = new TRWebchart_Bus.SeriesData(columns); // create series object from the column definition  
    var seriesParamObj = new TRWebchart_Shared.SeriesParam("series0",
            seriesData,
            TRWebchart_Bus.ChartType.Area2D,
            "X",
            ["Total Return"],
            "Y",
            0,
            false);
    seriesParamObj.setColorSharingCode("C1"); // optional  
    seriesParamObj.setShowLineGap(false); // optional  
    var balloption = { numberFormat: "#,###.0000", showLegendValue: true, updateLegendValue: true, updateLegendText: false, size: 4 };
    seriesParamObj.setBouncyBallsOptions(balloption);

    listOfSeriesParams.push(seriesParamObj);
    // start initialize data set of 2nd series 
    //var columns2 = [];
    //columns2.push({ Name: "X", Values: x }); // create x-axis column   
    //columns2.push({ Name: "CCI", Values: y2 }); // create y-axis column  
    //var seriesData2 = new TRWebchart_Bus.SeriesData(columns2); // create series object from the column definition  
    //var seriesParamObj2 = new TRWebchart_Shared.SeriesParam("series1",
    //        seriesData2,
    //        TRWebchart_Bus.ChartType.Area2D,
    //        "X",
    //        ["CCI"],
    //        "Y1",
    //        0,
    //        false);

    //seriesParamObj2.setBouncyBallsOptions(balloption);
    //listOfSeriesParams.push(seriesParamObj2);

    var chart = new TRWebchart_Bus.TRBusinessChart(chartNum);
    chart.setSeriesParams(listOfSeriesParams);
    chart.setXAxisType(TRWebchart_Bus.AxisType.DateTime);
    chart.setYAxisType(TRWebchart_Bus.AxisType.Numeric);

    // optional, setting chart property  
    chart.setXAxisTitle("Date");
    chart.setChartScheme(1); // 1 = charcoal 0 = pearl  
    chart.setRotateDegree(45);
    chart.setLegends(legends);
    chart.setChartTitle("Total Return", true);
    chart.enableBouncyBalls(true);

    chart.setYAxisTitles(["Total Return", "Total Return"]);
    chart.setColorsPalette([
        { "Index": 1, "Color": "#00ccff" }
    ]); // override default color palette of data index 1, which is line, to use red color  
    //  

    chart.render(); // draw chart  
}


function PriceDistributionGenerator(
            dCurrentAssetPrice,
            dExpectedReturnRate,
            dVolatility,
            timeToExpiry) {

    this.m_dCurrentPrice = dCurrentAssetPrice;
    this.m_dExpectedReturn = dExpectedReturnRate;
    this.m_dVolatility = dVolatility;
    this.m_dTimeToExpiry = timeToExpiry;

    this.m_dNormalDistributionVariance = this.m_dVolatility * this.m_dVolatility * this.m_dTimeToExpiry;
    this.m_dNormalDistributionAverage = this.m_dExpectedReturn * this.m_dTimeToExpiry + Math.log(dCurrentAssetPrice);

    this.GetDensityChartXYVals = GetDensityChartXYVals;

    function GetDensityChartXYVals() {

        var xValues = [];
        var yValues = [];
        var retParams = this.GetLogNormalParameter();

        var xStart = retParams[0];
        var xEnd = retParams[1];
        var miu = retParams[2];
        var sigma = retParams[3];
        for (var d = xStart; d < xEnd; d += (xEnd - xStart) / 2000) {
            xValues.push(d);
            yValues.push(this.LogNormal(d, miu, sigma));
        }

        return [xValues, yValues];
    }

    this.GetAccumulateChartXYVals = GetAccumulateChartXYVals;
    function GetAccumulateChartXYVals() {
        var xValues = [];
        var yValues = [];
        var retParams = this.GetLogNormalParameter();

        var xStart = retParams[0];
        var xEnd = retParams[1];
        var miu = retParams[2];
        var sigma = retParams[3];
        for (var d = xStart; d < xEnd; d += (xEnd - xStart) / 2000) {
            xValues.push(d);
            yValues.push(this.GetProbability(xStart, d));
        }

        return [xValues, yValues];
    }
    this.LogNormal = LogNormal;
    function LogNormal(x, miu, sigma) {
        if (x <= 0)
            return 0;
        return 1.0 / (x * Math.sqrt(2 * Math.PI) * sigma) * Math.exp(-1 * (Math.log(x) - miu) * (Math.log(x) - miu) / (2 * sigma * sigma));
    }
    this.GetLogNormalParameter = GetLogNormalParameter;
    function GetLogNormalParameter() {
        var xStart = this.ConvertNormalDistributionInputToPrice(-6);
        var xEnd = this.ConvertNormalDistributionInputToPrice(6);
        var miu = this.m_dNormalDistributionAverage;
        var sigma = Math.sqrt(this.m_dNormalDistributionVariance);

        return [xStart, xEnd, miu, sigma];
    }



    this.GetProbability = GetProbability;
    function GetProbability(dPriceMin, dPriceMax) {
        var dMinInStandNormalDistribution = this.ConvertPriceToNormalDistributionInput(dPriceMin);
        var dMaxInStandNormalDistribution = this.ConvertPriceToNormalDistributionInput(dPriceMax);
        var dProbabilityMin = normaldistribution(dMinInStandNormalDistribution);
        var dProbabilityMax = normaldistribution(dMaxInStandNormalDistribution);
        return dProbabilityMax - dProbabilityMin;
    }

    this.GetConfidenceRange = GetConfidenceRange;
    function GetConfidenceRange(Confidential) {
        var dMinPriceBindProbability = (1 - Confidential) / 2;
        var dMinInputInStandNormalDisstribution = invnormaldistribution(dMinPriceBindProbability);

        var dMaxInputInStandNormalDistribution = invnormaldistribution(1 - dMinPriceBindProbability);

        var dPriceMin = this.ConvertNormalDistributionInputToPrice(dMinInputInStandNormalDisstribution);
        var dPriceMax = this.ConvertNormalDistributionInputToPrice(dMaxInputInStandNormalDistribution);

        return [dPriceMin, dPriceMax];
    }

    this.ConvertPriceToNormalDistributionInput = ConvertPriceToNormalDistributionInput;
    function ConvertPriceToNormalDistributionInput(dPrice) {
        return (Math.log(dPrice) - this.m_dNormalDistributionAverage) / Math.sqrt(this.m_dNormalDistributionVariance);
    }

    this.ConvertNormalDistributionInputToPrice = ConvertNormalDistributionInputToPrice;
    function ConvertNormalDistributionInputToPrice(dStandardNormalDistributionInput) {
        return Math.exp(dStandardNormalDistributionInput * Math.sqrt(this.m_dNormalDistributionVariance) + this.m_dNormalDistributionAverage);
    }
}


function Sign(x) {
    if (x > 0) {
        return 1;
    }
    else if (x < 0) {
        return -1;
    }
    else {
        return 0;
    }
}

function Abs(x) {
    if (x < 0) {
        return -x;
    }
    else {
        return x;
    }
}
function errorfunction(x) {
    var result = 0;
    var xsq = 0;
    var s = 0;
    var p = 0;
    var q = 0;

    s = Sign(x);
    x = Abs(x);
    if (x < 0.5) {
        xsq = x * x;
        p = 0.007547728033418631287834;
        p = -0.288805137207594084924010 + xsq * p;
        p = 14.3383842191748205576712 + xsq * p;
        p = 38.0140318123903008244444 + xsq * p;
        p = 3017.82788536507577809226 + xsq * p;
        p = 7404.07142710151470082064 + xsq * p;
        p = 80437.3630960840172832162 + xsq * p;
        q = 0.0;
        q = 1.00000000000000000000000 + xsq * q;
        q = 38.0190713951939403753468 + xsq * q;
        q = 658.070155459240506326937 + xsq * q;
        q = 6379.60017324428279487120 + xsq * q;
        q = 34216.5257924628539769006 + xsq * q;
        q = 80437.3630960840172826266 + xsq * q;
        result = s * 1.1283791670955125738961589031 * x * p / q;
        return result;
    }
    if (x >= 10) {
        result = s;
        return result;
    }
    result = s * (1 - errorfunctionc(x));
    return result;
}
function errorfunctionc(x) {
    var result = 0;
    var p = 0;
    var q = 0;

    if (x < 0) {
        result = 2 - errorfunctionc(-x);
        return result;
    }
    if (x < 0.5) {
        result = 1.0 - errorfunction(x);
        return result;
    }
    if (x >= 10) {
        result = 0;
        return result;
    }
    p = 0.0;
    p = 0.5641877825507397413087057563 + x * p;
    p = 9.675807882987265400604202961 + x * p;
    p = 77.08161730368428609781633646 + x * p;
    p = 368.5196154710010637133875746 + x * p;
    p = 1143.262070703886173606073338 + x * p;
    p = 2320.439590251635247384768711 + x * p;
    p = 2898.0293292167655611275846 + x * p;
    p = 1826.3348842295112592168999 + x * p;
    q = 1.0;
    q = 17.14980943627607849376131193 + x * q;
    q = 137.1255960500622202878443578 + x * q;
    q = 661.7361207107653469211984771 + x * q;
    q = 2094.384367789539593790281779 + x * q;
    q = 4429.612803883682726711528526 + x * q;
    q = 6089.5424232724435504633068 + x * q;
    q = 4958.82756472114071495438422 + x * q;
    q = 1826.3348842295112595576438 + x * q;
    result = Math.exp(-x * x) * p / q;
    return result;
}
function normaldistribution(input) {
    var result = 0;

    result = 0.5 * (errorfunction(input / 1.41421356237309504880) + 1);
    return result;
}

function invnormaldistribution(y0) {
    var result = 0;
    var expm2 = 0;
    var s2pi = 0;
    var x = 0;
    var y = 0;
    var z = 0;
    var y2 = 0;
    var x0 = 0;
    var x1 = 0;
    var code = 0;
    var p0 = 0;
    var q0 = 0;
    var p1 = 0;
    var q1 = 0;
    var p2 = 0;
    var q2 = 0;

    expm2 = 0.13533528323661269189;
    s2pi = 2.50662827463100050242;
    if ((y0) <= (0)) {
        result = -Number.MAX_VALUE;
        return result;
    }
    if ((y0) >= (1)) {
        result = Number.MAX_VALUE;
        return result;
    }
    code = 1;
    y = y0;
    if ((y) > (1.0 - expm2)) {
        y = 1.0 - y;
        code = 0;
    }
    if ((y) > (expm2)) {
        y = y - 0.5;
        y2 = y * y;
        p0 = -59.9633501014107895267;
        p0 = 98.0010754185999661536 + y2 * p0;
        p0 = -56.6762857469070293439 + y2 * p0;
        p0 = 13.9312609387279679503 + y2 * p0;
        p0 = -1.23916583867381258016 + y2 * p0;
        q0 = 1;
        q0 = 1.95448858338141759834 + y2 * q0;
        q0 = 4.67627912898881538453 + y2 * q0;
        q0 = 86.3602421390890590575 + y2 * q0;
        q0 = -225.462687854119370527 + y2 * q0;
        q0 = 200.260212380060660359 + y2 * q0;
        q0 = -82.0372256168333339912 + y2 * q0;
        q0 = 15.9056225126211695515 + y2 * q0;
        q0 = -1.18331621121330003142 + y2 * q0;
        x = y + y * y2 * p0 / q0;
        x = x * s2pi;
        result = x;
        return result;
    }
    x = Math.sqrt(-(2.0 * Math.log(y)));
    x0 = x - Math.log(x) / x;
    z = 1.0 / x;
    if ((x) < (8.0)) {
        p1 = 4.05544892305962419923;
        p1 = 31.5251094599893866154 + z * p1;
        p1 = 57.1628192246421288162 + z * p1;
        p1 = 44.0805073893200834700 + z * p1;
        p1 = 14.6849561928858024014 + z * p1;
        p1 = 2.18663306850790267539 + z * p1;
        p1 = -(1.40256079171354495875 * 0.1) + z * p1;
        p1 = -(3.50424626827848203418 * 0.01) + z * p1;
        p1 = -(8.57456785154685413611 * 0.0001) + z * p1;
        q1 = 1;
        q1 = 15.7799883256466749731 + z * q1;
        q1 = 45.3907635128879210584 + z * q1;
        q1 = 41.3172038254672030440 + z * q1;
        q1 = 15.0425385692907503408 + z * q1;
        q1 = 2.50464946208309415979 + z * q1;
        q1 = -(1.42182922854787788574 * 0.1) + z * q1;
        q1 = -(3.80806407691578277194 * 0.01) + z * q1;
        q1 = -(9.33259480895457427372 * 0.0001) + z * q1;
        x1 = z * p1 / q1;
    }
    else {
        p2 = 3.23774891776946035970;
        p2 = 6.91522889068984211695 + z * p2;
        p2 = 3.93881025292474443415 + z * p2;
        p2 = 1.33303460815807542389 + z * p2;
        p2 = 2.01485389549179081538 * 0.1 + z * p2;
        p2 = 1.23716634817820021358 * 0.01 + z * p2;
        p2 = 3.01581553508235416007 * 0.0001 + z * p2;
        p2 = 2.65806974686737550832 * 0.000001 + z * p2;
        p2 = 6.23974539184983293730 * 0.000000001 + z * p2;
        q2 = 1;
        q2 = 6.02427039364742014255 + z * q2;
        q2 = 3.67983563856160859403 + z * q2;
        q2 = 1.37702099489081330271 + z * q2;
        q2 = 2.16236993594496635890 * 0.1 + z * q2;
        q2 = 1.34204006088543189037 * 0.01 + z * q2;
        q2 = 3.28014464682127739104 * 0.0001 + z * q2;
        q2 = 2.89247864745380683936 * 0.000001 + z * q2;
        q2 = 6.79019408009981274425 * 0.000000001 + z * q2;
        x1 = z * p2 / q2;
    }
    x = x0 - x1;
    if (code != 0) {
        x = -x;
    }
    result = x;
    return result;
}
//arrInputDays [30,60,90]
//arrInputIVs  [30DayIV,60DayIV,90DayIV]
function ATMIVInterpolator(arrInputDays, arrInputIVs) {
    this.m_arrInputDays = arrInputDays;
    this.m_arrInputIVs = arrInputIVs;

    this.CalculateIV = CalculateIV;
    function CalculateIV(nDays) {
        if (this.m_arrInputDays.length != this.m_arrInputDays.length || this.m_arrInputDays.lenth <= 0) {
            return 0;
        }
        var MinIndex = -1;
        var MaxIndex = -1;
        for (var nIndex = 0; nIndex < this.m_arrInputDays.length; nIndex++) {
            if (this.m_arrInputDays[nIndex] > nDays) {
                MaxIndex = nIndex;
                MinIndex = nIndex - 1;
                break;
            }

        }
        if (MaxIndex < 0) {
            return this.m_arrInputIVs[this.m_arrInputIVs.length - 1];
        }
        else if (MinIndex < 0 && MaxIndex >= 0) {
            return this.m_arrInputIVs[0];
        }
        else {
            var nDaysDuring = this.m_arrInputDays[MaxIndex] - this.m_arrInputDays[MinIndex];

            var nSlope = (nDays - this.m_arrInputDays[MinIndex]) / nDaysDuring;
            var nIncreased = nSlope * (this.m_arrInputIVs[MaxIndex] - this.m_arrInputIVs[MinIndex]);
            return nIncreased + this.m_arrInputIVs[MinIndex];

        }

    }


}
//arrInputDates 
//arrInputDiviends  
function DividendYieldCalculator(arrInputDates, arrInputCashFlows) {
    this.m_arrInputDates = arrInputDates;
    this.m_arrInputCashFlows = arrInputCashFlows;

    this.SumDividend = SumDividend;
    function SumDividend(nStartIndex, nEndIndex) {
        var nSum = 0;
        for (var nIndex = nStartIndex; nIndex <= nEndIndex; nIndex++) {
            nSum += this.m_arrInputCashFlows[nIndex];
        }
        return nSum;
    }
    this.CalculateYieldForDate = CalculateYieldForDate;
    function CalculateYieldForDate(inputDate, inputSpotPrice) {
        if (this.m_arrInputDates.length != this.m_arrInputCashFlows.length || this.m_arrInputDates.lenth <= 0) {
            return 0;
        }
        var MinIndex = -1;
        var MaxIndex = -1;
        for (var nIndex = 0; nIndex < this.m_arrInputDates.length; nIndex++) {
            var nDaysDiff = DateDiff("day", this.m_arrInputDates[nIndex], inputDate);
            if (nDaysDiff > 0) {
                MaxIndex = nIndex;
                MinIndex = nIndex - 1;
                break;
            }

        }


        var DividendTilEndDay = 0;
        if (MinIndex < 0 && MaxIndex >= 0) {
            var Today = new Date();
            var nDaysFromNow = DateDiff("day", Today, inputDate);
            var nTotalDays = DateDiff("day", Today, this.m_arrInputDates[MaxIndex]);


            DividendTilEndDay = this.m_arrInputCashFlows[MaxIndex] * nDaysFromNow / nTotalDays;
        }
        else if (MaxIndex < 0 && MinIndex < 0) {
            DividendTilEndDay = this.SumDividend(0, this.m_arrInputCashFlows.length - 1);
        }
        else {

            var div = this.SumDividend(0, MinIndex);


            var nTotalDays = DateDiff("day", this.m_arrInputDates[MaxIndex], this.m_arrInputDates[MinIndex]);
            var nIncludingDays = DateDiff("day", inputDate, this.m_arrInputDates[MinIndex]);

            DividendTilEndDay = div + nIncludingDays / nTotalDays * this.m_arrInputCashFlows[MaxIndex];

        }

        var today = new Date();

        var during = DateDiff("day", inputDate, today);

        var yearlydiv = 360 / during * DividendTilEndDay;

        return yearlydiv / inputSpotPrice;
    }
}

function TimeCom(dateValue) {
    var newCom = new Date(dateValue);
    this.year = newCom.getYear();
    this.month = newCom.getMonth() + 1;
    this.day = newCom.getDate();
    this.hour = newCom.getHours();
    this.minute = newCom.getMinutes();
    this.second = newCom.getSeconds();
    this.msecond = newCom.getMilliseconds();
    this.week = newCom.getDay();
}

function DateDiff(interval, date1, date2) {
    var TimeCom1 = new TimeCom(date1);
    var TimeCom2 = new TimeCom(date2);
    var result;
    switch (String(interval).toLowerCase()) {
        case "y":
        case "year":
            result = TimeCom1.year - TimeCom2.year;
            break;
        case "n":
        case "month":
            result = (TimeCom1.year - TimeCom2.year) * 12 + (TimeCom1.month - TimeCom2.month);
            break;
        case "d":
        case "day":
            result = Math.round((Date.UTC(TimeCom1.year, TimeCom1.month - 1, TimeCom1.day) - Date.UTC(TimeCom2.year, TimeCom2.month - 1, TimeCom2.day)) / (1000 * 60 * 60 * 24));
            break;
        case "h":
        case "hour":
            result = Math.round((Date.UTC(TimeCom1.year, TimeCom1.month - 1, TimeCom1.day, TimeCom1.hour) - Date.UTC(TimeCom2.year, TimeCom2.month - 1, TimeCom2.day, TimeCom2.hour)) / (1000 * 60 * 60));
            break;
        case "m":
        case "minute":
            result = Math.round((Date.UTC(TimeCom1.year, TimeCom1.month - 1, TimeCom1.day, TimeCom1.hour, TimeCom1.minute) - Date.UTC(TimeCom2.year, TimeCom2.month - 1, TimeCom2.day, TimeCom2.hour, TimeCom2.minute)) / (1000 * 60));
            break;
        case "s":
        case "second":
            result = Math.round((Date.UTC(TimeCom1.year, TimeCom1.month - 1, TimeCom1.day, TimeCom1.hour, TimeCom1.minute, TimeCom1.second) - Date.UTC(TimeCom2.year, TimeCom2.month - 1, TimeCom2.day, TimeCom2.hour, TimeCom2.minute, TimeCom2.second)) / 1000);
            break;
        case "ms":
        case "msecond":
            result = Date.UTC(TimeCom1.year, TimeCom1.month - 1, TimeCom1.day, TimeCom1.hour, TimeCom1.minute, TimeCom1.second, TimeCom1.msecond) - Date.UTC(TimeCom2.year, TimeCom2.month - 1, TimeCom2.day, TimeCom2.hour, TimeCom2.minute, TimeCom2.second, TimeCom1.msecond);
            break;
        case "w":
        case "week":
            result = Math.round((Date.UTC(TimeCom1.year, TimeCom1.month - 1, TimeCom1.day) - Date.UTC(TimeCom2.year, TimeCom2.month - 1, TimeCom2.day)) / (1000 * 60 * 60 * 24)) % 7;
            break;
        default:
            result = "invalid";
    }
    return (result);
}

function DateAdd(interval, num, dateValue) {
    var newCom = new TimeCom(dateValue);
    switch (String(interval).toLowerCase()) {
        case "y": case "year": newCom.year += num; break;
        case "n": case "month": newCom.month += num; break;
        case "d": case "day": newCom.day += num; break;
        case "h": case "hour": newCom.hour += num; break;
        case "m": case "minute": newCom.minute += num; break;
        case "s": case "second": newCom.second += num; break;
        case "ms": case "msecond": newCom.msecond += num; break;
        case "w": case "week": newCom.day += num * 7; break;
        default: return ("invalid");
    }
    var now = newCom.year + "/" + newCom.month + "/" + newCom.day + " " + newCom.hour + ":" + newCom.minute + ":" + newCom.second;
    return (new Date(now));
}

function Map() {
    this.elements = new Array();
    //获取MAP元素个数      
    this.size = function () {
        return this.elements.length;
    }

    //判断MAP是否为空      
    this.isEmpty = function () {
        return (this.elements.length < 1);
    }
    //删除MAP所有元素      
    this.clear = function () {
        this.elements = new Array();
    }
    //向MAP中增加元素（key, value)       
    this.put = function (_key, _value) {
        this.elements.push({
            key: _key,
            value: _value
        });
    }
    //删除指定KEY的元素，成功返回True，失败返回False      
    this.remove = function (_key) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    this.elements.splice(i, 1);
                    return true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    }
    //获取指定KEY的元素值VALUE，失败返回NULL      
    this.get = function (_key) {
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    return this.elements[i].value;
                }
            }
        } catch (e) {
            return null;
        }
    }
    //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL      
    this.element = function (_index) {
        if (_index < 0 || _index >= this.elements.length) {
            return null;
        }
        return this.elements[_index];
    }
    //判断MAP中是否含有指定KEY的元素      
    this.containsKey = function (_key) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    }
    //判断MAP中是否含有指定VALUE的元素      
    this.containsValue = function (_value) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].value == _value) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    }
    //获取MAP中所有VALUE的数组（ARRAY）      
    this.values = function () {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].value);
        }
        return arr;
    }
    //获取MAP中所有KEY的数组（ARRAY）      
    this.keys = function () {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].key);
        }
        return arr;
    }
}

