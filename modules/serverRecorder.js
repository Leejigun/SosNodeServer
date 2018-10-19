/**
 * SOS 오픈잇 서버 테스트용
 * 매 시각 모든 API를 호출해서 기록
 */

const request = require(`request`);
const scheduler = require(`node-schedule`);
const moment = require(`moment-timezone`);
const db = require(`./weatherDBManager`);
const { Observable } = require('rxjs');
const { map, flatMap, catchError } = require('rxjs/operators');
/**
 * 호출할 때 마다 최신 시간을 기록
 */
function getNow() {
        return moment().tz(`Asia/Seoul`);
}
module.exports.runAPIRecorder = () => {

        const rule = new scheduler.RecurrenceRule();
        rule.minute = [0, 30];
        
        console.log(`runAPIRecorder start ${getNow().format("YYYYMMDD:HHmm:ss")}`);
        this.callRealTime();
        this.callUV();
        this.callAir();
        this.callWeek();
        // 매 시각 API 호출
        const k = scheduler.scheduleJob(rule, () => {
                var now = getNow().format("YYYYMMDD:HHmm:ss");
                console.log(`scheduleJob start: ${now}`);
                this.callRealTime();
                this.callUV();
                this.callAir();
                this.callWeek();
        });
};

const headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Content-Type': 'application/x-www-form-urlencoded',
};

module.exports.callRealTime = () => {
        var param = {nx:61,ny:126,base_date:``,base_time:""};
        
        var currentTime = getNow().format("HH");
        if ((currentTime *1) < 10) {
                currentTime = `${currentTime}00`;
        } else {
                currentTime = `${currentTime}00`;
        }
        var today = getNow().format("YYYYMMDD:HHmm");

        if((currentTime * 1) < 0200) {
                // 어제 2300을 찔러야한다.
                param.base_date = getNow().add(-1, 'days').format(`YYYYMMDD`);
                param.base_time = `2300`;
        } else {
                param.base_date = getNow().format(`YYYYMMDD`);
                param.base_time = currentTime;
        }

        const options = {
                url: `http://intra.openit.co.kr:12080/weather/realTime.json`,
                method: 'GET',
                headers: headers,
                qs: param
        };
        console.log(param);
        //request Server
        requestAPI(options)
        //save DB
        .subscribe(
                data => { db.saveLog(`realTime`,`${today}(${param.base_date}:${param.base_time})`,data); }, 
                e => { db.saveLog(`realTime`,`${param.base_date}:${param.base_time}`,e); },
                () => { }
        );
};

module.exports.callUV = () => {
        var param = {areaNo:`1100000000`};
        
        var today = getNow().format("YYYYMMDD:HHmm");

        const options = {
                url: `http://intra.openit.co.kr:12080/weather/ultraRays.json`,
                method: 'GET',
                headers: headers,
                qs: param
        };
        console.log(param);
        //request Server
        requestAPI(options)
        //save DB
        .subscribe(
                data => { db.saveLog(`ultraRays`,today,data); }, 
                e => { db.saveLog(`ultraRays`,today,e); },
                () => { }
        );
};
module.exports.callAir = () => {
        var param = {sidoName:`1100000000`};
        
        var today = getNow().format("YYYYMMDD:HHmm");

        const options = {
                url: `http://intra.openit.co.kr:12080/weather/airPol.json`,
                method: 'GET',
                headers: headers,
                qs: param
        };
        console.log(param);
        //request Server
        requestAPI(options)
        //save DB
        .subscribe(
                data => { db.saveLog(`airPol`,today,data); }, 
                e => { db.saveLog(`airPol`,today,e); },
                () => { }
        );
};
module.exports.callWeek = () => {
        var param = {nx:61,ny:126,base_date:``,base_time:``};
        
        var currentTime = getNow().format("HH00");
        var today = getNow().format("YYYYMMDD:HHmm");

        

        if((currentTime *1) < 0200) {
                // 어제 2300을 찔러야한다.
                param.base_date = getNow().add(-1, 'days').format(`YYYYMMDD`);
                param.base_time = `2300`;
        } else {
                var time = (currentTime *= 1);
                if(time >= 0300 && time <= 0500) {
                        param.base_time = `0200`;
                } else if(time >= 0600 && time <= 0800) {
                        param.base_time = `0500`;
                } else if(time >= 0900 && time <= 1100) {
                        param.base_time = `0800`;
                } else if(time >= 1200 && time <= 1400) {
                        param.base_time = `1100`;
                } else if(time >= 1500 && time <= 1700) {
                        param.base_time = `1400`;
                } else if(time >= 1800 && time <= 2000) {
                        param.base_time = `1700`;
                } else if(time >= 2100 && time <= 2300) {
                        param.base_time = `2000`;
                } else {
                        param.base_time = `2300`;
                }
                param.base_date = getNow().format(`YYYYMMDD`);
        }

        const options = {
                url: `http://intra.openit.co.kr:12080/weather/neighborHoodList.json`,
                method: 'GET',
                headers: headers,
                qs: param
        };
        console.log(param);
        //request Server
        requestAPI(options)
        //save DB
        .subscribe(
                data => { db.saveLog(`neighborHoodList`,`${today}(${param.base_date}:${param.base_time})`,data); }, 
                e => { db.saveLog(`neighborHoodList`,`${param.base_date}:${param.base_time}`,e); },
                () => { }
        );
};

function requestAPI(options) {
        return Observable.create(subscriber => {
                request (options, function (error, response, body) {
                        if(!error && response.statusCode == 200) {
                                /// 성공일 경우
                                try {
                                        subscriber.next(body);
                                } catch(exception) {
                                        console.log(`error: ${exception}`);
                                        subscriber.error(`data parsing error: ${exception}`);
                                }
                        } else {
                                subscriber.error(`can not load data from server: ${error}`);
                        }
                });
        });
}