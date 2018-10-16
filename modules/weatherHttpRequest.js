const request = require(`request`);
const json = require('JSON');
const parser = require(`../model/weatherModelMaker`);
const db = require(`./weatherDBManager`);
const { Observable } = require('rxjs');
const { flatMap } = require('rxjs/operators');

const weatherKey = "ZHm06BbETswi8agKXwQpmqyxIwPld1Dl7iqLbioQidBZIXl1vkGotdpj3PA6PMXnVmj1r7UJUAdRKq1ulcriEw==";

const headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Content-Type': 'application/x-www-form-urlencoded',
};
// 실시간 날씨 정보 조회
module.exports.getRealtimeWeatherFromServer = (param) => {
        // 파라미터 셋팅
        param.ServiceKey = weatherKey;
        param._type = 'json';
        const options = {
                url: `http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastGrib`,
                method: 'GET',
                headers: headers,
                qs: param
        };
        return Observable.create(subscriber => {
                request (options, function (error, response, body) {
                        if(!error && response.statusCode == 200) {
                                /// 성공일 경우
                                try {
                                        var jsonData = json.parse(body);
                                        var itemArray = jsonData.response.body.items.item;
                                        var item = parser.jsonDataToRealtimeWeather(itemArray);
                                        subscriber.next(item);
                                } catch(exception) {
                                        console.log(`error: ${exception}`);
                                        subscriber.error(`data parsing error: ${exception}`);
                                }
                        } else {
                                subscriber.error(`can not load data from server: ${error}`);
                        }
                });
        }).pipe(flatMap(item => {
                return db.setRealTimeWeather(item);
        }));
};
// 주간 날씨 정보 조회
module.exports.getWeekWeatherFromServer = (param) => {
        // 파라미터 셋팅
        param.ServiceKey = weatherKey;
        param.numOfRows = 300;
        param._type = 'json';
        const options = {
                url: `http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData`,
                method: 'GET',
                headers: headers,
                qs: param
        };
        return Observable.create(subscriber => {
                request (options, function (error, response, body) {
                        if(!error && response.statusCode == 200) {
                                /// 성공일 경우
                                try {
                                        var jsonData = json.parse(body);
                                        var itemArray = jsonData.response.body.items.item;
                                        var item = parser.jsonDataToWeekWeather(itemArray);
                                        subscriber.next(item);
                                } catch(exception) {
                                        console.log(`error: ${exception}`);
                                        subscriber.error(`data parsing error: ${exception}`);
                                }
                        } else {
                                subscriber.error(`can not load data from server: ${error}`);
                        }
                });
        }).pipe(flatMap(item => {
                return db.setWeekWeather(item);
        }));
};