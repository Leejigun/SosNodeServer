const $ = module.exports;
const modelMaker = require(`../model/weatherModelMaker`);

/*실시간 기상정보, 주간 기상정보 요청 데이터 파싱*/
$.weatherModelParse = function (req) {
	const nx = req.query.nx;
	const ny = req.query.ny;
	const base_date = req.query.base_date;
	const base_time = req.query.base_time;
	if(nx == null || ny == null || base_date == null || base_time == null) {
		return null;
	}
	return { nx:nx, ny:ny, base_date:base_date, base_time:base_time };
};
$.ultraRayModel = function (req) {
	const areaNo = req.query.areaNo;
	if(areaNo == null) {
		return null;
	} else {
		return {areaNo:areaNo};
	}
};
$.arlModel = function (req) {
	const sidoName = req.query.sidoName;
	if(sidoName == null) {
		return null;
	} else {
		return {sidoName:sidoName};
	}
};