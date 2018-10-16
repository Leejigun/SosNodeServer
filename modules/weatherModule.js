const json = require(`JSON`);
const modelMaker = require(`../model/weatherModelMaker`);
const parser = require(`./weatherParser`);
const dbManager = require(`./weatherDBManager`);
const httpProvider = require(`./weatherHttpRequest`);
const { Observable } = require('rxjs');
const { flatMap } = require('rxjs/operators');

/*실시간 날씨 조회*/
module.exports.getRealTimeWeather = function (req, res) {
	var param = parser.weatherModelParse(req);
	Observable.create(subscriber => {
		/*req 파싱*/
		if(param != null) {
			subscriber.next(param);
		} else {
			// 파라미터 오류인 경우
			subscriber.error(`parameter is not valid`);
		}
		subscriber.complete();
	})
	// 디비에 있는지 확인 후 있으면 가져오고 없으면 null 반환
	.pipe(flatMap(param => {return dbManager.getRealTimeWeather(param);}))
	.pipe(flatMap(data => {
		/// 데이터가 없는 경우 기상청 서버에 데이터를 던지고 db에 저장 후 내려준다.
		console.log(data);
		if(!data) { return httpProvider.getRealtimeWeatherFromServer(param); } 
		else { return data; }
	}))
	.subscribe(
		v => { res.send(v); },
		e => { res.send(modelMaker.RealtimeWeather(false,e,null)); }
	);
};
/*자외선 지수 조회*/
module.exports.getUltraLife = function (req, res) {
	
};
/*통합 대기환경지수 조회*/
module.exports.getAirCondition = function (req, res) {
	
};
/*주간 날씨 정보 조회*/
module.exports.getWeekWeather = function (req, res) {
	var param = parser.weatherModelParse(req);
	Observable.create(subscriber => {
		/*req 파싱*/
		if(param != null) {
			subscriber.next(param);
		} else {
			// 파라미터 오류인 경우
			subscriber.error(`parameter is not valid`);
		}
		subscriber.complete();
	})
	// 디비에 있는지 확인 후 있으면 가져오고 없으면 null 반환
	.pipe(flatMap(param => {return dbManager.getWeekWeather(param);}))
	.pipe(flatMap(data => {
		/// 데이터가 없는 경우 기상청 서버에 데이터를 던지고 db에 저장 후 내려준다.
		if(!data) { return httpProvider.getWeekWeatherFromServer(param); } 
		else { return data; }
	}))
	.subscribe(
		v => { res.send(v); },
		e => { res.send(modelMaker.RealtimeWeather(false,e,null)); }
	);
};