/*var sto=hq_str_sh600000;
			alert(hq_str_sh600000);*/
function GetSupportedRankingType() {//夏普比率下拉列表框
	var RankingTypes = [];
	//RankingTypes.push("-Select-");
	/*RankingTypes.push("RSI");
	RankingTypes.push("KDJ");*/
	RankingTypes.push("SharpRatio");
	return RankingTypes;
}

function TimerSubscription() {

	//SubscribeTimeSeries(TimeSeriesAllRICList);
}

function GetCurrentRankingType() {//获取当前排序类型
	var RankingType = $("#RankingType").val();
	return RankingType;
}

function GetRankValueForRIC(strRICName) {//按股票代码获取排序值
	if(!mapRICTRDistriDate.isEmpty()) {
		CalculateTRTRRanking(strRICName);
	}
	var RankingType = GetCurrentRankingType();
	if(RankingType == "CCI") {
		if(!mapRICToCCIRankData.containsKey(strRICName)) {
			return "";
		} else {
			return mapRICToCCIRankData.get(strRICName);
		}
	} else if(RankingType == "RSI") {
		if(!mapRICToRSIRankData.containsKey(strRICName)) {
			return "";
		} else {
			return mapRICToRSIRankData.get(strRICName);
		}
	} else if(RankingType == "KDJ") {
		if(!mapRICToKDJRankData.containsKey(strRICName)) {
			return "";
		} else {
			return mapRICToKDJRankData.get(strRICName);
		}
	} else if(RankingType == "SharpRatio") {
		if(mapRICTRRankingData.containsKey(strRICName)) {
			return mapRICTRRankingData.get(strRICName);
		}
	} else {

	}

	return 0;
}

function SelectRowAndUpdateChart(nRow) {
	var row = nRow;
	var data = grid.getData();
	var ricname = data[row]["ricname"];

	if(ricname != "") {
		selectedrow = row;

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

			TRDate = [];
			TRValue = [];

			for(var i = 0; i < DataForChart.length; i++) {
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
						TRValue.push(DataForChart[i].NDA_TRTN);
					}
				} else if(tenor == 7) {
					{
						TRValue.push(DataForChart[i].NDA_TRTN_1W);
					}
				} else if(tenor == 30) {
					{
						TRValue.push(DataForChart[i].NDA_TRTN_1M);
					}
				} else if(tenor == 90) {
					{
						TRValue.push(DataForChart[i].NDA_TRTN_3MT);
					}
				} else if(tenor == 365) {
					{
						TRValue.push(DataForChart[i].NDA_YR_TRTN);
					}
				} else {}

			}

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
		grid.render();
		//refresh();
	}

}