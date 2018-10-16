/*firebase admin setup*/
const admin = require(`firebase-admin`);
const serviceAccount = require("../config/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://openitsos.firebaseio.com"
});

const { Observable } = require('rxjs');
const { map, flatMap, catchError } = require('rxjs/operators');
const json = require('JSON');
/*firebase db settup*/
const db = admin.database();
const ref = db.ref(`weather`);

/*실시간 날씨 조회*/
module.exports.getRealTimeWeather = function (param) {
	/*값을 꺼내오기 위해 value로 설정*/
	return Observable.create(subscriber => {
		var realTimeRef = ref.child("realTime").child(param.base_date).child(param.base_time);
		realTimeRef.once("value", (data) => {
			var array = data.val();
			var returnData = null;
			for(var index in array) {
				var element = array[index];
				if(element.nx == param.nx && element.ny == param.ny) {
					returnData = returnData;
					break;
				}
			}
			// 자꾸 여기서 2번 호출하려는 버그 있음.
			subscriber.next(returnData);
		});
	});
};
module.exports.setRealTimeWeather = function (data) {
	var realTimeRef = ref.child("realTime").child(`${data.baseDate}`).child(`${data.baseTime}`).push();
	return Observable.create(subscriber => {
		realTimeRef.set	(data,function(error) {
			if(error) {
				subscriber.error(error);
			} else {
				subscriber.next(data);
			}
		});
	});
};
/*자외선 지수 조회*/
module.exports.getUltraLife = function (req, res) {
	
};
/*통합 대기환경지수 조회*/
module.exports.getAirCondition = function (req, res) {
	
};
/*주간 날씨 정보 조회*/
module.exports.getWeekWeather = function (param) {
	var weekRef = ref.child("weekWeather").child(param.base_date).child(param.base_time);
	/*값을 꺼내오기 위해 value로 설정*/
	return Observable.create(subscriber => {
		weekRef.once("value", (data) => {
			var array = data.val();
			var returnData = null;
			for(var index in array) {
				var element = array[index];
				if(element.nx == param.nx && element.ny == param.ny) {
					returnData = returnData;
					break;
				}
			}
			// 자꾸 여기서 2번 호출하려는 버그 있음.
			subscriber.next(returnData);
		});
	});
};
module.exports.setWeekWeather = function (data) {
	var weekRef = ref.child("weekWeather").child(`${data.baseDate}`).child(`${data.baseTime}`).push();
	return Observable.create(subscriber => {
		weekRef.set	(data,function(error) {
			if(error) {
				subscriber.error(error);
			} else {
				subscriber.next(data);
			}
		});
	});
};