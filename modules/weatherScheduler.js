const scheduler = require(`node-schedule`);
const reuqester = require(`./weatherHttpRequest`);

module.exports.startScheduler = () => {
        console.log(`start startScheduler`);

        const uvRule = new scheduler.RecurrenceRule();
        uvRule.dayOfWeek = [0, new scheduler.Range(0, 6)];
        uvRule.hour = 0;

        const airRule = new scheduler.RecurrenceRule();
        airRule.dayOfWeek = [0, new scheduler.Range(0, 6)];
        airRule.hour = [0,6,12,18];
        airRule.minute = 0;

        /// 하루에 4번 정각에 호출
        const airScjeduler = scheduler.scheduleJob(airRule,() => {
                console.log(`call scheduleJob`);
        });
};
