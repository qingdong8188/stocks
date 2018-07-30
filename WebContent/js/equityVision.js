var mapRICTimeSeriesPriceData = new Map();
var mapRICTimeSeriesTRData = new Map();
var mapRICTRDistriDate = new Map();
var mapRICTRRankingData = new Map();
//var objTimeSeriesSubscription;
var mapRICToRSIData = new Map();
var mapRICToCCIData = new Map();
var mapRICToKDJData = new Map();
var mapRICToMAData = new Map();

var mapRICToRSIRankData = new Map();
var mapRICToCCIRankData = new Map();
var mapRICToKDJRankData = new Map();

var CurrentTimeSeriesRIC = "";

var TRView = "";
var TimeSeriesAllRICList = [];
var RSIXData = [];
var RSIY1Data = [];
var RSIY2Data = [];
var RSIY3Data = [];

var CCIXData = [];
var CCIY1Data = [];
var CCIY2Data = [];

var KDJXData = [];
var KDJY1Data = [];
var KDJY2Data = [];
var KDJY3Data = [];
var KDJY4Data = [];

var MAXData = [];
var MAY1Data = [];
var MAY2Data = [];
var MAY3Data = [];
var MAY4Data = [];

var TRDate = [];
var TRValue = [];

var TRDistrX = [];
var TRDistrY = [];
var stockDatas=[];
$(document).ready(function() {
	/*$('#exchangelist').change(function() {
		var ricnames = callStatelessApp('GetEquityListByExchange', $("#exchangelist").val());
		var ricnamearray = [];
		data = jQuery.parseJSON(ricnames);
		data = jQuery.toString(ricnames);
		$.each(data, function(i, item) {
			ricnamearray.push(item.RICName);
		});

		$("#supportedriclist").empty();
		for(var j = 0; j < ricnamearray.length; j++) {
			$("#supportedriclist").append("<option value='" + ricnamearray[j] + "'>" + ricnamearray[j] + "</option>");
		}

		$("#supportedriclist").select2();
		$("#s2id_supportedriclist").css('display', 'inline-block');
	});*/

	$('#supportedriclist').change(function() {
		var SelectIndexArray = [];
		var SelectedRIC = $("#supportedriclist").val();
		var data = grid.getData();
		for(var k = 0; k < data.length; k++) {
			if(data[k]["ricname"] == SelectedRIC) {
				SelectIndexArray.push(k);
				grid.setSelectedRows(SelectIndexArray);
				grid.scrollRowIntoView(k, false);
				SelectRowAndUpdateChart(k);
				return;
			}
		}

	});
	$('#tenorlist').change(function() {
		//subscribesource();
		mapRICTimeSeriesPriceData.clear();
		refreshgrid();
	});

	$('#input_lowerprice').change(function() {
		range2possbility();
	});

	$('#input_upperprice').change(function() {
		range2possbility();
	});

	var arrSupportedRankingTypes = GetSupportedRankingType();
	for(var j = 0; j < arrSupportedRankingTypes.length; j++) {
		$("#RankingType").append("<option value='" + arrSupportedRankingTypes[j] + "'>" + arrSupportedRankingTypes[j] + "</option>");
	}
	$("#RankingType").change(function() {
		refreshgrid();
	});

});

function RSIchart1() {
	drawChartRSI(RSIXData, RSIY1Data, RSIY2Data, RSIY3Data, "chart1");
}

function CCIchart1() {
	drawChartCCI(CCIXData, CCIY2Data, "chart1");
}

function KDJchart1() {
	drawChartKDJ(KDJXData, KDJY2Data, KDJY3Data, KDJY4Data, "chart1");
}

function TRchart1() {
	drawChart("chart1");
}

function MAchart1() {
	drawChartMA(MAXData, MAY1Data, MAY2Data, MAY3Data, MAY4Data, "chart1");
}

function RSIchart2() {
	drawChartRSI(RSIXData, RSIY1Data, RSIY2Data, RSIY3Data, "chart2");
}

function CCIchart2() {
	drawChartCCI(CCIXData, CCIY2Data, "chart2");
}

function KDJchart2() {
	drawChartKDJ(KDJXData, KDJY2Data, KDJY3Data, KDJY4Data, "chart2");
}

function TRchart2() {
	drawChart("chart2");
}

function MAchart2() {
	drawChartMA(MAXData, MAY1Data, MAY2Data, MAY3Data, MAY4Data, "chart2");
}

function TR1chart1() {
	drawChartTR1(TRDistrX, TRDistrY, "chart1");
}

function TR1chart2() {
	drawChartTR1(TRDistrX, TRDistrY, "chart2");
}

function TR2chart1() {
	drawChartTR2(TRDate, TRValue, "chart1");
}

function TR2chart2() {
	drawChartTR2(TRDate, TRValue, "chart2");
}

function display_alert(msg) {
	var tsType = "error";
	var tsPosition = "toast-top-left";
	var tsTitle = "";
	var tsText = msg;
	toastr.options = {
		"positionClass": tsPosition,
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut",
		"showDuration": "1000",
		"hideDuration": "1000",
		"timeOut": "2000",
		"extendedTimeOut": "1000"
	};
	if(tsTitle === '') {
		toastr[tsType](tsText);
	} else {
		toastr[tsType](tsText, tsTitle);
	}
}

function initialize() {

	initControls();

}

var ricinfoarray = [];

function initControls() {
	var exchangelist = callStatelessApp('GetExgNameList', null);
	var exchangearray = [];
	data = jQuery.parseJSON(exchangelist);
	$.each(data, function(i, item) {
		exchangearray.push(item);
	});
	for(var j = 0; j < exchangearray.length; j++) {
		$("#exchangelist").append("<option value='" + exchangearray[j] + "'>" + exchangearray[j] + "</option>");
	}

	var ricnames = callStatelessApp('GetEquityListByExchange', $("#exchangelist").val());
	var ricnamearray = [];
	data = jQuery.parseJSON(ricnames);
	$.each(data, function(i, item) {
		ricnamearray.push(item.RICName);
	});
	for(var j = 0; j < ricnamearray.length; j++) {
		$("#supportedriclist").append("<option value='" + ricnamearray[j] + "'>" + ricnamearray[j] + "</option>");
	}
	$("#supportedriclist").select2();

	var tenorlist = callStatelessApp('GetTenors', null);
	var tenortextarray = [];
	var tenordaysarray = [];
	data = jQuery.parseJSON(tenorlist);
	$.each(data, function(i, item) {
		tenortextarray.push(item.TenorValue);
		tenordaysarray.push(item.Days);
	});
	for(var j = 0; j < tenortextarray.length; j++) {
		$("#tenorlist").append("<option value='" + tenordaysarray[j] + "'>" + tenortextarray[j] + "</option>");
	}

	var allrics = callStatelessApp('GetEquityNameList', null);

	data = jQuery.parseJSON(allrics);
	$.each(data, function(i, item) {
		ricinfoarray.push({
			"ricname": item.RICName
		});
	});

}

var subscription_array = [];

function subscribeall(ricnamearray) {
	for(var i = 0; i < subscription_array.length; i++) {
		if(subscription_array[i]["baseric"] != null) {
			/*subscription_array[i]["baseric"].stop();*/
			return this;
		}
	}
	
	// clear the array
	subscription_array.splice(0, subscription_array.length);
	TimeSeriesAllRICList = ricnamearray;
	setInterval("TimerSubscription()",1000);
	/*for(var j = 0; j < ricnamearray.length; j++) {
		f: for(var i = 0; i < stockArray.length; i++) {
			if(ricnamearray[j] == stockArray[i]) {
				if(i>stockInfo.length){
					break f;
				}
				var stockName = stockInfo[i].split(",");
				displayname = stockName[0];
				price = stockName[3];
				tradedate = stockName[30];
				var data = grid.getData();
				for(var k = 0; k < data.length; k++) {
					if(data[k]["ricname"] == ricnamearray[j]) {
						data[k]["price"] = price;
						data[k]["tradedate"] = tradedate;
						data[k]["onedayprice"] = price;
						data[k]["displayname"] = displayname;
						//if (data.ranking != '') {
							data[k]["ranking"] = data[k].ranking;
                        //}
						grid.setData(data);
						grid.render();
						break f;
					}
				}

			}
		}
	}*/
	SubscribeTimeSeries(TimeSeriesAllRICList);
	setInterval("TimerSubscription()", 1000);
}

function SubscribeTimeSeries(allRICs) {
	
	if(null == allRICs || allRICs.length == 0) {
		return;
	}
	/*if(objTimeSeriesSubscription) {
		objTimeSeriesSubscription.unsubscribe()
		objTimeSeriesSubscription = null;
	}*/
	for(var j = 0; j < allRICs.length; j++) {
		if(allRICs[j] != "") {
			CurrentTimeSeriesRIC = allRICs[j];
		} else {
			continue;
		}
		if(!mapRICTimeSeriesPriceData.containsKey(allRICs[j])) {
			var elw = [];
			var data = allRICs[j];
			$.ajax({
                url: 'http://localhost:8081/',
                type: 'post',
                data: data,
                async:false,
                success: function (data) {
                    console.log("this is:"+data);
                    stockDatas = data;
                },
            });
            for(var i = 0; i < stockDatas.length; i++) {
				if(allRICs[j]  == stockDatas[i].code) {
						elw.push(stockDatas[i]);//将数据存入数组
				}
			}
			onTimeSeriesData(elw);
			//onTimeSeriesError(elw);
			break;
		}
	}

}

function onTimeSeriesData(args) {
	if(args.length > 3000000) { // too big data
	} else {
		if(args.length > 0) {

			if(!mapRICTimeSeriesPriceData.containsKey(CurrentTimeSeriesRIC)) {
				mapRICTimeSeriesPriceData.put(CurrentTimeSeriesRIC, args);
				// RSI Value
				var RSIValue = new RSICalculator(CurrentTimeSeriesRIC, 6);
				RSIValue.Calculate();
				mapRICToRSIData.put(CurrentTimeSeriesRIC, RSIValue);

				// CCI Value
				var CCIValue = new CCICalculator(CurrentTimeSeriesRIC, 14);
				CCIValue.Calculate();
				mapRICToCCIData.put(CurrentTimeSeriesRIC, CCIValue);
				// KDJ Value
				var KDJValue = new KDJCalculator(CurrentTimeSeriesRIC, 9);
				KDJValue.Calculate();
				mapRICToKDJData.put(CurrentTimeSeriesRIC, KDJValue);
				// MR Value
				var MAValue = new MACalculator(CurrentTimeSeriesRIC);
				MAValue.Calculate();
				mapRICToMAData.put(CurrentTimeSeriesRIC, MAValue);

				var objRankCalculator = new RankingCalculator(CurrentTimeSeriesRIC);

				var nKDJRankRet = objRankCalculator.KDJRanking(KDJValue.KValueArray, KDJValue.JValueArray);
				if(nKDJRankRet == 1) {
					mapRICToKDJRankData.put(CurrentTimeSeriesRIC, "*****");
				} else {
					mapRICToKDJRankData.put(CurrentTimeSeriesRIC, "");
				}

				var nRSIRankRet = objRankCalculator.RSIRanking(RSIValue.RSI1ValueArray, RSIValue.RSI2ValueArray, RSIValue.RSI3ValueArray);
				if(nRSIRankRet == 1) {
					mapRICToRSIRankData.put(CurrentTimeSeriesRIC, "*****");
				} else {
					mapRICToRSIRankData.put(CurrentTimeSeriesRIC, "");
				}

				var nCCIRankRet = objRankCalculator.CCIRanking(CCIValue.CCIValueArray);
				if(nCCIRankRet == 1) {
					mapRICToCCIRankData.put(CurrentTimeSeriesRIC, "*****");
				} else {
					mapRICToCCIRankData.put(CurrentTimeSeriesRIC, "");
				}

				CalculateTRTR(CurrentTimeSeriesRIC);//计算表格的五个值
				CalculateTRTRRanking(CurrentTimeSeriesRIC);//计算收益数据和制图数据
				//赋值夏普比率
				var data = grid.getData();
				for(var k = 0; k < data.length; k++) {
					if(data[k]["ricname"] == CurrentTimeSeriesRIC) {
						data[k]["ranking"] = GetRankValueForRIC(CurrentTimeSeriesRIC);
						grid.setData(data);
						grid.render();
						break;
					}
				}
				CurrentTimeSeriesRIC = "";
			}

		}

	}

	/*if(objTimeSeriesSubscription) {
		objTimeSeriesSubscription.unsubscribe();
		objTimeSeriesSubscription = null;
	}*/

	SubscribeTimeSeries(TimeSeriesAllRICList);

}

/*function onTimeSeriesError(args) {
	if(objTimeSeriesSubscription) {
		objTimeSeriesSubscription.unsubscribe();
		objTimeSeriesSubscription = null;
	}

	SubscribeTimeSeries(TimeSeriesAllRICList);
}*/

/*function GetTimeSeriesObject(ric) {
	var msg = {
		"ric": "AAL.L",
		"feed": "IDN",
		"view": "Nda_raw",
		"numberOfPoints": 265,
		"timeZone": "Instrument",
		"intervalType": "Daily",
		"intervalLength": 1,
		"adjustedPrice": true
	};
	msg.ric = ric;
	return msg;
}*/
//计算表格里的数据
function CalculateTRTR(ric) {
	var closePrice = [];
	var strDate = [];
	//遍历数据并存入收盘价和日期值
	for(var i = 0; i < stockDatas.length; i++) {
		if(ric == stockDatas[i].code) {
			if((typeof(stockDatas[i].close) != "undefined") && (typeof(stockDatas[i].date) != "undefined")) {
				closePrice.push(stockDatas[i].close);
				strDate.push(stockDatas[i].date);
			}

		}
	}
	//将数据反转
	closePrice.reverse();
	strDate.reverse();

	var myDate = new Date()
	var strToday = myDate.toLocaleDateString()

	var onedaytr_val = 0.0;
	var oneweektr_val = 0.0;
	var onemonthtr_val = 0.0;
	var onequartertr_val = 0.0;
	var oneyeartr_val = 0.0;

	var trval = [-10000, -10000, -10000, -10000, -10000];
	var trPrice = [];
	var strtrDate = [];

	var data = grid.getData();
	for(var k = 0; k < data.length; k++) {
		if(data[k]["ricname"] == ric) {
			// var price = data[k]["price"];
			var IndexIn = [1, 7, 30, 90, 365];
			for(var i = 0; i < IndexIn.length; i++) {
				for(var d = 0; d < strDate.length; d++) {
					var diff = DateDiff(strToday, strDate[d])
					if((diff+1 >= IndexIn[i]) && (diff < (IndexIn[i] + 5))) {
						trval[i] = (closePrice[0]-closePrice[d+1]) / closePrice[d+1] * 100;//计算表格里的五个收益值
//						trval[i] = (price - closePrice[d]) / closePrice[d] * 100;
						trPrice[i] = closePrice[d];
						strtrDate[i] = FormatDate(strDate[d]);
						break;
					}
				}
			}
			//将五个收益值分别赋值
			if(trval[0] != -10000) {
				data[k]["onedaytr"] = trval[0].toFixed(2);
				data[k]["onedaydate"] = strtrDate[0];
				data[k]["onedayprice"] = trPrice[0].toFixed(2);
			}

			if(trval[1] != -10000) {
				data[k]["oneweektr"] = trval[1].toFixed(2);
				data[k]["oneweekdate"] = strtrDate[1];
				data[k]["oneweekprice"] = trPrice[1].toFixed(2);
			}

			if(trval[2] != -10000) {
				data[k]["onemonthtr"] = trval[2].toFixed(2);
				data[k]["onemonthdate"] = strtrDate[2];
				data[k]["onemonthprice"] = trPrice[2].toFixed(2);
			}

			if(trval[3] != -10000) {
				data[k]["onequartertr"] = trval[3].toFixed(2);
				data[k]["onequarterdate"] = strtrDate[3];
				data[k]["onequarterprice"] = trPrice[3].toFixed(2);
			}

			if(trval[4] != -10000) {
				data[k]["oneyeartr"] = trval[4].toFixed(2);
				data[k]["oneyeardate"] = strtrDate[4];
				data[k]["oneyearprice"] = trPrice[4].toFixed(2);
			}

			grid.setData(data);
			grid.invalidate();
			grid.render();
			break;
		}
	}
	
}

function TRDistribution() {
	this.XCoordinate = [];
	this.YCoordinate = [];

	this.Add = Add;

	function Add(X, Y) {
		this.XCoordinate.push(X);
		this.YCoordinate.push(Y);
	}
	this.RemoveAll = RemoveAll;

	function RemoveAll() {
		this.XCoordinate = [];
		this.YCoordinate = [];
	}
}
//收益率,夏普比率,制图数据的计算
function CalculateTRTRRanking(ric) {
	var tenor = $("#tenorlist").val()
	var priceObject = mapRICTimeSeriesPriceData.get(ric);
	var TRValue = [];
	var trval = [];
	for(i = priceObject.length-1; i > 0; i--) {
		if(tenor == 1) {
			try{
				trval[i] = (priceObject[i].close - priceObject[i-1].close) / priceObject[i-1].close * 100;
				TRValue.push(trval[i]);
		    }catch(error){
		    	continue;
		    }
		} else if(tenor == 7) {
			try{
				trval[i] = (priceObject[i].close - priceObject[i-5].close) / priceObject[i-5].close * 100;
				TRValue.push(trval[i]);
		    }catch(error){
		    	continue;
		    }
		} else if(tenor == 30) {
			try{
				trval[i] = (priceObject[i].close - priceObject[i-22].close) / priceObject[i-22].close * 100;
				TRValue.push(trval[i]);
		    }catch(error){
		    	continue;
		    }
		} else if(tenor == 90) {
			try{
				trval[i] = (priceObject[i].close - priceObject[i-66].close) / priceObject[i-66].close * 100;
				TRValue.push(trval[i]);
		    }catch(error){
		    	continue;
		    }
		} else if(tenor == 365) {
			try{
				trval[i] = (priceObject[i].close - priceObject[i-265].close) / priceObject[i-265].close * 100;
				TRValue.push(trval[i]);
		    }catch(error){
		    	continue;
		    }
			
		} else {}
		if(TRValue.length==265){
			break;
		}
	}

	TRValue.sort(NumAscSort)

	var TRMin = TRValue[0]
	var TRMax = TRValue[TRValue.length - 1]
	var RangeSize = 100
	var SubRange = (TRMax + (TRMax - TRMin) / RangeSize - TRMin) / RangeSize
	//var mapRangeTRData = new Map();
	var arrNum = new Array(RangeSize)
	var arrMaxValue = new Array(RangeSize)
	for(i = 0; i < RangeSize; i++) {
		arrNum[i] = 0;
		arrMaxValue[i] = -1000;
	}
	for(CurTR = 0; CurTR < TRValue.length; CurTR++) {
		var IndexRange = parseInt((TRValue[CurTR] - TRMin) / SubRange);
		arrNum[IndexRange] = arrNum[IndexRange] + 1;

		if(arrMaxValue[IndexRange] < TRValue[CurTR]) {
			arrMaxValue[IndexRange] = TRValue[CurTR];
		}

	}

	var nTotalCount = 0;
	var nMaxIndex = -1;
	var nMaxCount = 0;
	for(count = 0; count < arrNum.length; count++) {
		if(arrNum[count] > nMaxCount) {
			nMaxCount = arrNum[count]
			nMaxIndex = count
		}
		nTotalCount = nTotalCount + arrNum[count];
	}

	var TRExpetation = 0.0;
	for(count = 0; count < arrNum.length; count++) {
		TRExpetation += (((TRMin + SubRange * count) + (TRMin + SubRange * (count + 1))) / 2) * arrNum[count] / nTotalCount;
	}

	nMaxIndex = parseInt((TRExpetation - TRMin) / SubRange);

	var RankingValue = 0;
	if(arrMaxValue[nMaxIndex] >= parseInt(TRValue.length * 0.68)) {
		if(nMaxIndex == 0) {
			RankingValue = 10000;
		} else {
			RankingValue = (arrMaxValue[nMaxIndex] / SubRange).toFixed(2);
		}

	} else {
		var MinRangeValue = -1000;
		var MaxRangeValue = -1000;
		var TotalCount = parseInt(nMaxCount / 2);
		for(count = nMaxIndex - 1; count >= 0; count--) {
			TotalCount = TotalCount + arrNum[count];
			if(TotalCount >= parseInt(TRValue.length * 0.34)) {
				MinRangeValue = arrMaxValue[count];
				break;
			}

		}

		TotalCount = parseInt(nMaxCount / 2);
		for(count = nMaxIndex + 1; count < arrNum.length; count++) {
			TotalCount = TotalCount + arrNum[count];
			if(TotalCount >= parseInt(TRValue.length * 0.34)) {
				MaxRangeValue = arrMaxValue[count];
				break;
			}

		}

		if(arrMaxValue[nMaxIndex] == -1000) {
			arrMaxValue[nMaxIndex] = ((TRMin + SubRange * nMaxIndex) + (TRMin + (SubRange * nMaxIndex + 1))) / 2;
		}

		var RankingValue = 0;
		if(MinRangeValue == -1000) {
			if(MaxRangeValue == arrMaxValue[nMaxIndex]) {
				RankingValue = 10000;
			} else {
				RankingValue = (0.5 * arrMaxValue[nMaxIndex] / (MaxRangeValue - arrMaxValue[nMaxIndex])).toFixed(2) * 2;
			}

		} else if(MaxRangeValue == -1000) {
			if(MinRangeValue == arrMaxValue[nMaxIndex]) {
				RankingValue = 10000;
			} else {
				RankingValue = (0.5 * arrMaxValue[nMaxIndex] / (arrMaxValue[nMaxIndex] - MinRangeValue)).toFixed(2);
			}
		} else {

			RankingValue = (arrMaxValue[nMaxIndex] / (MaxRangeValue - MinRangeValue)).toFixed(2);
		}
		if(RankingValue == 0.0)
			RankingValue = 0.00;
	}
	
	var data = grid.getData();
	data.ranking = RankingValue;
	grid.setData(data);
	grid.render();
	
	mapRICTRRankingData.remove(ric);
	mapRICTRRankingData.put(ric, RankingValue)

	var structTRDate = new TRDistribution();
	for(i = 0; i < RangeSize; i++) {
		var X = (TRMin + i * SubRange).toFixed(2).toString() + "%~" + (TRMin + (i + 1) * SubRange).toFixed(2).toString() + "%";
		var Y = (arrNum[i] / nTotalCount * 100).toFixed(2);
		structTRDate.Add(X, Y);
	}
	mapRICTRDistriDate.remove(ric);
	mapRICTRDistriDate.put(ric, structTRDate);
}

function NumAscSort(a, b) {
	return a - b
}

function StringToDate(DateStr) {
	var converted = Date.parse(DateStr);
	var myDate = new Date(converted);
	if(isNaN(myDate)) {
		var arys = DateStr.split('-');
		myDate = new Date(arys[0], --arys[1], arys[2]);
	}
	return myDate;
}

function FormatDate(aDate) {
	if(typeof aDate == 'string') {
		aDate = StringToDate(aDate);
	}

	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var day = aDate.getDate();
	var monthIndex = aDate.getMonth() + 1;
	var year = aDate.getFullYear();

	//return day + ' ' + monthNames[monthIndex] + ' ' + year;
	return year + "年" + monthIndex + "月" + day + "日";
}

function DateDiff(dtStart, dtEnd) {
	if(typeof dtStart == 'string') {
		dtStart = StringToDate(dtStart);
	}
	if(typeof dtEnd == 'string') {
		dtEnd = StringToDate(dtEnd);
	}

	return Math.abs(parseInt((dtEnd - dtStart) / 86400000));

}

function RankingCCIValue() {
	var RankingRICs = [];
	var keyArray = mapRICToCCIData.keys;
	for(i = 0; i < keyArray.length; i++) {
		var CCICalculator = mapRICToCCIData[keyArray[i]];
		var CCIValueArray = CCICalculator.CCIValueArray;
		var CCIValueLength = CCIValueArray.length;
		if(CCIValueLength > 2) {
			var CCIValue1 = CCIValueArray[CCIValueLength - 1];
			var CCIValue2 = CCIValueArray[CCIValueLength - 2];
			if((CCIValue1 > CCIValue2) && (CCIValue1 > 50.0)) {
				RankingRICs.push(keyArray[i]);
			}
		}
	}
}

function refresh() {
	//var varCalculator = new genvarcalculator($("#baseric_href").text(), $("#divcfric_href").text(), $("#atmivric_href").text(), $("#tenorlist").val());
	//varCalculator.calculate();
	//draw();
	var price_val = parseFloat($("#text_price").val());
	var rawyield_val = parseFloat($("#text_rawyield").val());
	var yield_val = parseFloat($("#text_yield").val());
	var iv_val = parseFloat($("#text_iv").val());
	var tenordays = parseFloat($("#tenorlist").val());

	if(price_val > 0 && iv_val > 0) {

		var xValues = [];
		var y1Values = [];
		var y2Values = [];
		var PrcGen = new PriceDistributionGenerator(price_val, rawyield_val - yield_val, iv_val, tenordays / 365.0);

		// var confidential
		var range_90 = PrcGen.GetConfidenceRange(0.9);
		$("#VARTable tr:eq(1) td:nth-child(2)").html(range_90[0].toFixed(2));
		$("#VARTable tr:eq(1) td:nth-child(3)").html(range_90[1].toFixed(2));

		var range_95 = PrcGen.GetConfidenceRange(0.95);
		$("#VARTable tr:eq(2) td:nth-child(2)").html(range_95[0].toFixed(2));
		$("#VARTable tr:eq(2) td:nth-child(3)").html(range_95[1].toFixed(2));

		var range_99 = PrcGen.GetConfidenceRange(0.99);
		$("#VARTable tr:eq(3) td:nth-child(2)").html(range_99[0].toFixed(2));
		$("#VARTable tr:eq(3) td:nth-child(3)").html(range_99[1].toFixed(2));

		// max lose and max gain
		var cur_price = price_val;
		if($("#text_buyingprice").val().trim() != "") {
			cur_price = parseFloat($("#text_buyingprice").val());
		}
		$("#VARTable tr:eq(1) td:nth-child(4)").html((cur_price - range_90[0]).toFixed(2));
		$("#VARTable tr:eq(1) td:nth-child(5)").html((range_90[1] - cur_price).toFixed(2));
		$("#VARTable tr:eq(2) td:nth-child(4)").html((cur_price - range_95[0]).toFixed(2));
		$("#VARTable tr:eq(2) td:nth-child(5)").html((range_95[1] - cur_price).toFixed(2));
		$("#VARTable tr:eq(3) td:nth-child(4)").html((cur_price - range_99[0]).toFixed(2));
		$("#VARTable tr:eq(3) td:nth-child(5)").html((range_99[1] - cur_price).toFixed(2));

		// draw chart
		var ret = PrcGen.GetDensityChartXYVals();

		xValues = ret[0];
		y1Values = ret[1];
		var ret2 = PrcGen.GetAccumulateChartXYVals();

		y2Values = ret2[1];
		drawChartXY(xValues, y1Values, y2Values);

	}

}

function range2possbility() {
	var lower_price = parseFloat($("#input_lowerprice").val());
	var upper_price = parseFloat($("#input_upperprice").val());

	if(lower_price > 0 && upper_price > 0) {
		var price_val = parseFloat($("#text_price").val());
		var rawyield_val = parseFloat($("#text_rawyield").val());
		var yield_val = parseFloat($("#text_yield").val());
		var iv_val = parseFloat($("#text_iv").val());
		var tenordays = parseFloat($("#tenorlist").val());

		if(price_val > 0 && iv_val > 0) {

			var PrcGen = new PriceDistributionGenerator(price_val, rawyield_val - yield_val, iv_val, tenordays / 365.0);
			var retParams = PrcGen.GetLogNormalParameter();
			var xStart = retParams[0];
			var poss = PrcGen.GetProbability(xStart, upper_price) - PrcGen.GetProbability(xStart, lower_price);
			var poss = poss * 100;
			$('#span_possiblity').html(poss.toFixed(2) + "%");

		}
	} else {
		$('#span_possiblity').html("");
	}
}

function addrictogrid() {
	var data = grid.getData();
	data.push({
		ricname: $("#supportedriclist").val(),
		price: "",
		displayname: "",
		tradedate: "",
		onedayprice: "",
		onedaydate: "",
		onedaytr: "",
		oneweekprice: "",
		oneweekdate: "",
		oneweektr: "",
		onemonthprice: "",
		onemonthdate: "",
		onemonthtr: "",
		onequarterprice: "",
		onequarterdate: "",
		onequartertr: "",
		oneyearprice: "",
		oneyeardate: "",
		oneyeartr: "",
		totalreturn: "",
		atmivric: ""
	});
	grid.setData(data);
	grid.updateRowCount();
	grid.render();
	
}

function addalltogrid() {
	var data = grid.getData();
	$("#supportedriclist option").each(function(i) {
		data.push({
			ricname: $(this).val(),
			price: "",
			displayname: "",
			tradedate: "",
			onedayprice: "",
			onedaydate: "",
			onedaytr: "",
			oneweekprice: "",
			oneweekdate: "",
			oneweektr: "",
			onemonthprice: "",
			onemonthdate: "",
			onemonthtr: "",
			onequarterprice: "",
			onequarterdate: "",
			onequartertr: "",
			oneyearprice: "",
			oneyeardate: "",
			oneyeartr: "",
			totalreturn: "",
			atmivric: ""
		});
	});

	grid.setData(data);
	grid.updateRowCount();
	grid.render();
}

function removeallfromgrid() {
	mapRICTimeSeriesPriceData.clear();
	var data = grid.getData();
	data.splice(0, data.length);
	grid.setData(data);
	grid.updateRowCount();
	grid.render();
}

function refreshgrid() {
	var data = grid.getData();
	var ricnamearray = [];
	var atmivricarray = [];
	for(var i = 0; i < data.length; i++) {
		for(var j = 0; j < ricinfoarray.length; j++) {
			if(data[i]["ricname"] == ricinfoarray[j]["ricname"]) {
				break;
			}
		}

		ricnamearray.push(data[i]["ricname"]);
	}
	grid.setData(data);
	subscribeall(ricnamearray);
}

var grid;
var selectedrow = 0;
var columns = [{
		id: "ricname",
		name: "RIC",
		field: "ricname",
		sortable: true
	},
	{
		id: "displayname",
		name: "Display Name",
		field: "displayname",
		sortable: true,
		cssClass: "align3 monospace",
		headerCssClass: "align3"
	},
	{
		id: "price",
		name: "Trade Price",
		field: "price",
		sortable: true,
		cssClass: "align3 monospace",
		headerCssClass: "align3"
	},
	{
		id: "tradedate",
		name: "Trade Date",
		field: "tradedate",
		sortable: true,
		cssClass: "align3 monospace",
		headerCssClass: "align3"
	},
	{
		id: "ranking",
		name: "Ranking",
		field: "ranking",
		sortable: true,
		cssClass: "align3 monospace",
		headerCssClass: "align3"
	}

];

var options = {
	enableCellNavigation: true,
	enableColumnReorder: false,
	forceFitColumns: true,
	multiColumnSort: true,
	rowHeight: 27
};

$(function() {

	var data = [];

	grid = new Slick.Grid("#MySlickGrid", data, columns, options);
	//grid.getCanvasNode().classList.add('selectable');

	grid.onSort.subscribe(function(e, args) {
		var cols = args.sortCols;
		data.sort(function(dataRow1, dataRow2) {
			for(var i = 0, l = cols.length; i < l; i++) {
				var field = cols[i].sortCol.field;
				var sign = cols[i].sortAsc ? 1 : -1;
				var value1 = parseFloat(dataRow1[field]),
					value2 = parseFloat(dataRow2[field]);

				var result = 0;
				if(isNaN(value1) && isNaN(value2)) {
					var tmpVal1 = dataRow1[field];
					var tmpVal2 = dataRow2[field];
					if(tmpVal1 > tmpVal2) {
						result = 1 * sign;
					} else if(tmpVal1 < tmpVal2) {
						result = -1 * sign;
					} else {
						result = 0;
					}

				} else {
					if(isNaN(value1)) {
						result = -1 * sign;
					} else if(isNaN(value2)) {
						result = 1 * sign;
					} else {
						result = (value1 == value2 ? 0 : (value1 > value2 ? 1 : -1)) * sign;
					}
				}

				if(result != 0) {
					return result;
				}
			}
			return 0;
		});
		grid.invalidate();
		grid.render();
	});
	grid.setSelectionModel(new Slick.RowSelectionModel());
	grid.onDblClick.subscribe(function(e, args) {
		var cell = grid.getCellFromEvent(e);
		var row = cell.row;
		var data = grid.getData();
		var ricname = data[row]["ricname"];

		if(ricname != "") {
			selectedrow = row;
			$("#baseric_href").text(data[row]["ricname"]);
			$("#displayname_href").text(data[row]["displayname"]);
			$("#ricdivcf_href").text(data[row]["ricname"].replace(".", "DIVCF."));
			$("#text_onedayprice").val(data[row]["onedayprice"]);
			$("#text_onedaydate").val(data[row]["onedaydate"]);
			$("#text_onedaytr").val(data[row]["onedaytr"]);
			$("#text_oneweekprice").val(data[row]["oneweekprice"]);
			$("#text_oneweekdate").val(data[row]["oneweekdate"]);
			$("#text_oneweektr").val(data[row]["oneweektr"]);
			$("#text_onemonthprice").val(data[row]["onemonthprice"]);
			$("#text_onemonthdate").val(data[row]["onemonthdate"]);
			$("#text_onemonthtr").val(data[row]["onemonthtr"]);
			$("#text_onequarterprice").val(data[row]["onequarterprice"]);
			$("#text_onequarterdate").val(data[row]["onequarterdate"]);
			$("#text_onequartertr").val(data[row]["onequartertr"]);
			$("#text_oneyearprice").val(data[row]["oneyearprice"]);
			$("#text_oneyeardate").val(data[row]["oneyeardate"]);
			$("#text_oneyeartr").val(data[row]["oneyeartr"]);

			if(mapRICTimeSeriesPriceData.containsKey(ricname)) {
				var DataForChart = mapRICTimeSeriesPriceData.get(ricname);

				var RSICalculator = mapRICToRSIData.get(ricname);
				var TechRSI1Data = RSICalculator.RSI1ValueArray;
				var TechRSI2Data = RSICalculator.RSI2ValueArray;
				var TechRSI3Data = RSICalculator.RSI3ValueArray;

				var CCICalculator = mapRICToCCIData.get(ricname);
				var TechCCIData = CCICalculator.CCIValueArray;

				var KDJCalculator = mapRICToKDJData.get(ricname);
				var TechKData = KDJCalculator.KValueArray;
				var TechDData = KDJCalculator.DValueArray;
				var TechJData = KDJCalculator.JValueArray;

				var MACalculator = mapRICToMAData.get(ricname);
				var TechMA5Data = MACalculator.MA5ValueArray;
				var TechMA10Data = MACalculator.MA10ValueArray;
				var TechMA20Data = MACalculator.MA20ValueArray;
				var TechMA30Data = MACalculator.MA30ValueArray;

				TRDistrX = [];
				TRDistrY = [];

				var structTRDate = mapRICTRDistriDate.get(ricname);
				TRDistrX = structTRDate.XCoordinate;
				TRDistrY = structTRDate.YCoordinate;

				RSIXData = [];
				RSIY1Data = [];
				RSIY2Data = [];
				RSIY3Data = [];

				CCIXData = [];
				CCIY1Data = [];
				CCIY2Data = [];

				KDJXData = [];
				KDJY1Data = [];
				KDJY2Data = [];
				KDJY3Data = [];
				KDJY4Data = [];

				MAXData = [];
				MAY1Data = [];
				MAY2Data = [];
				MAY3Data = [];
				MAY4Data = [];
				
				trval = [];
				TRDate = [];
				TRValue = [];

				for(var i = DataForChart.length-1; i > 0; i--) {
					//RSIY1Data.push(DataForChart[i].CLOSE);
					RSIY1Data.push(TechRSI1Data[i]);
					RSIY2Data.push(TechRSI2Data[i]);
					RSIY3Data.push(TechRSI3Data[i]);
					RSIXData.push(new Date(Date.parse(DataForChart[i].date.substr(0, 10))));
	
					CCIY2Data.push(TechCCIData[i]);
					CCIXData.push(new Date(Date.parse(DataForChart[i].date.substr(0, 10))));
	
					KDJY1Data.push(DataForChart[i].price);
					KDJY2Data.push(TechKData[i]);
					KDJY3Data.push(TechDData[i]);
					KDJY4Data.push(TechJData[i]);
					KDJXData.push(new Date(Date.parse(DataForChart[i].date.substr(0, 10))));
	
					MAY1Data.push(TechMA5Data[i]);
					MAY2Data.push(TechMA10Data[i]);
					MAY3Data.push(TechMA20Data[i]);
					MAY4Data.push(TechMA30Data[i]);
					MAXData.push(new Date(Date.parse(DataForChart[i].date.substr(0, 10))));
	
					TRDate.push(new Date(Date.parse(DataForChart[i].date.substr(0, 10))));
					var tenor = $("#tenorlist").val()
					if(tenor == 1) {
						{
							try{
								trval[i] = (DataForChart[i].close - DataForChart[i-1].close) / DataForChart[i-1].close * 100;
								TRValue.push(trval[i]);
						    }catch(error){
						    	continue;
						    }
						}
					} else if(tenor == 7) {
						{
							try{
								trval[i] = (DataForChart[i].close - DataForChart[i-5].close) / DataForChart[i-5].close * 100;
								TRValue.push(trval[i]);
						    }catch(error){
						    	continue;
						    }
						}
					} else if(tenor == 30) {
						{
							try{
								trval[i] = (DataForChart[i].close - DataForChart[i-22].close) / DataForChart[i-22].close * 100;
								TRValue.push(trval[i]);
						    }catch(error){
						    	continue;
						    }
						}
					} else if(tenor == 90) {
						{
							try{
								trval[i] = (DataForChart[i].close - DataForChart[i-66].close) / DataForChart[i-66].close * 100;
								TRValue.push(trval[i]);
						    }catch(error){
						    	continue;
						    }
						}
					} else if(tenor == 365) {
						{
							try{
								trval[i] = (DataForChart[i].close - DataForChart[i-265].close) / DataForChart[i-265].close * 100;
								TRValue.push(trval[i]);
						    }catch(error){
						    	continue;
						    }
						}
					} else {}
					if(TRValue.length==265){
						break;
					}

				}
				
				TRValue.reverse();
				RSIY1Data.reverse();
				RSIY2Data.reverse();
				RSIY3Data.reverse();
				RSIXData.reverse();
				CCIY2Data.reverse();
				CCIXData.reverse();
				KDJY1Data.reverse();
				KDJY2Data.reverse();
				KDJY3Data.reverse();
				KDJY4Data.reverse();
				KDJXData.reverse();
				MAY1Data.reverse();
				MAY2Data.reverse();
				MAY3Data.reverse();
				MAY4Data.reverse();
				MAXData.reverse();
				TRDate.reverse();
				
				var ip1 = "";
				var rPort1 = document.getElementsByName("group1");
				for(i = 0; i < rPort1.length; i++) {
					if(rPort1[i].checked)
						ip1 = rPort1[i].value;
					if(ip1 == "RSI1")
						RSIchart1();
					else if(ip1 == "CCI1")
						CCIchart1();
					else if(ip1 == "KDJ1")
						KDJchart1();
					else if(ip1 == "TotalReturn1")
						TR2chart1();
					else if(ip1 == "MA1")
						MAchart1();
					else if(ip1 == "TotalReturn3")
						TR1chart1();

				}

				var ip2 = "";
				var rPort2 = document.getElementsByName("group2");
				for(i = 0; i < rPort2.length; i++) {
					if(rPort2[i].checked)
						ip2 = rPort2[i].value;
					if(ip2 == "RSI2")
						RSIchart2();
					else if(ip2 == "CCI2")
						CCIchart2();
					else if(ip2 == "KDJ2")
						KDJchart2();
					else if(ip2 == "TotalReturn2")
						TR2chart2();
					else if(ip2 == "MA2")
						MAchart2();
					else if(ip2 == "TotalReturn4")
						TR1chart2();
				}
			}
			//refresh();
		}
	});
})