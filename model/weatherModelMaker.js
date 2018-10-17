const $ = module.exports;

/*실시간 날씨 응답 메소드*/
$.jsonDataToRealtimeWeather = (array) => {
	var item = {PTY:``,REH:``,RN1:``,T1H:'',UUU:``,VEC:``,VVV:``,WSD:``,baseDate:``,baseTime:``,nx:``,ny:``};
	for( var index in array) {
		var element = array[index];
		if(element.category == `PTY`) {
			item.PTY = element.obsrValue;
		} else if(element.category == `REH`) {
			item.REH = element.obsrValue;
		} else if(element.category == `RN1`) {
			item.RN1 = element.obsrValue;
		} else if(element.category == `T1H`) {
			item.T1H = element.obsrValue;
		} else if(element.category == `UUU`) {
			item.UUU = element.obsrValue;
		} else if(element.category == `VEC`) {
			item.VEC = element.obsrValue;
		} else if(element.category == `VVV`) {
			item.VVV = element.obsrValue;
		} else {
			item.WSD = element.obsrValue;
		}
	}
	var first = array[0];
	item.baseDate = first.baseDate;
	item.baseTime = first.baseTime;
	item.nx = first.nx;
	item.ny = first.ny;
	return item;
};
$.RealtimeWeather = (isSuccess,message,item) => {
	this.isSuccess = isSuccess;
	this.message = message;
	this.item = item;
	return this;
};

$.jsonDataToWeekWeather = (array) => {
	var dateDic = [];
	var returnObject = {baseDate:``,baseTime:``,nx:``,ny:``,items:[]};
	// 날짜별로 파싱
	for( var index in array) {
		var element = array[index];
		if(element.fcstDate in dateDic) {
			dateDic[element.fcstDate].push(element);
		} else {
			dateDic[element.fcstDate] = [ element ];
		}
	}
	// 시간별로 파싱
	var items = [];
	for(var key in dateDic) {
		var dateArray = dateDic[key];
		var timeDic = {};
		for(var i in dateArray) {
			var dateElement = dateArray[i];
			if(dateElement.fcstTime in timeDic) {
				timeDic[dateElement.fcstTime].push(dateElement);
			} else {
				timeDic[dateElement.fcstTime] = [ dateElement ];
			}
		}
		for(var timeKey in timeDic) {
			var timeArray = timeDic[timeKey];
			var item = {POP:``,PTY:``,REH:``,SKY:'',T3H:``,TMX:``,UUU:``,WSD:``,VEC:``,VVV:``,fcstDate:``,fcstTime:``};
			for(var timeIndex in timeArray) {
				var timeElement = timeArray[timeIndex];
				if(timeElement.category == `POP`) {
					item.POP = timeElement.fcstValue;
				} else if(timeElement.category == `PTY`) {
					item.PTY = timeElement.fcstValue;
				} else if(timeElement.category == `REH`) {
					item.REH = timeElement.fcstValue;
				} else if(timeElement.category == `SKY`) {
					item.SKY = timeElement.fcstValue;
				} else if(timeElement.category == `T3H`) {
					item.T3H = timeElement.fcstValue;
				} else if(timeElement.category == `TMX`) {
					item.TMX = timeElement.fcstValue;
				} else if(timeElement.category == `UUU`) {
					item.UUU = timeElement.fcstValue;
				} else if(timeElement.category == `WSD`) {
					item.WSD = timeElement.fcstValue;
				} else if(timeElement.category == `VEC`) {
					item.VEC = timeElement.fcstValue;
				} else {
					item.VVV = timeElement.fcstValue;
				}
			}
			item.fcstDate = timeArray[0].fcstDate;
			item.fcstTime = timeArray[0].fcstTime;
			items.push(item);
		}
	}
	var first = array[0];
	returnObject.baseDate = first.baseDate;
	returnObject.baseTime = first.baseTime;
	returnObject.nx = first.nx;
	returnObject.ny = first.ny;
	returnObject.items = items;
	return returnObject;
};
$.WeekWeather = (isSuccess,message,item) => {
	this.isSuccess = isSuccess;
	this.message = message;
	this.item = item;
	return this;
};