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
			var element = dateArray[i];
			if(element.fcstTime in timeDic) {
				timeDic[element.fcstTime].push(element);
			} else {
				timeDic[element.fcstTime] = [ element ];
			}
		}
		for(var timeKey in timeDic) {
			var timeArray = timeDic[timeKey];
			var item = {POP:``,PTY:``,REH:``,SKY:'',T3H:``,TMX:``,UUU:``,WSD:``,VEC:``,VVV:``,fcstDate:``,fcstTime:``};
			for(var timeIndex in timeArray) {
				var element = timeArray[timeIndex];
				if(element.category == `POP`) {
					item.POP = element.fcstValue;
				} else if(element.category == `PTY`) {
					item.PTY = element.fcstValue;
				} else if(element.category == `REH`) {
					item.REH = element.fcstValue;
				} else if(element.category == `SKY`) {
					item.SKY = element.fcstValue;
				} else if(element.category == `T3H`) {
					item.T3H = element.fcstValue;
				} else if(element.category == `TMX`) {
					item.TMX = element.fcstValue;
				} else if(element.category == `UUU`) {
					item.UUU = element.fcstValue;
				} else if(element.category == `WSD`) {
					item.WSD = element.fcstValue;
				} else if(element.category == `VEC`) {
					item.VEC = element.fcstValue;
				} else {
					item.VVV = element.fcstValue;
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