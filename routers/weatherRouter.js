module.exports = (app) => {
	const express = require(`express`);
	const router = express.Router();
	const weatherModule = require(`../modules/weatherModule`);

	//TODO: test Code
	router.get(`/`, (req, res) => {
		res.send(`hello`);
	});
	/*실시간 날씨 정보*/
	router.get(`/realTime.json`, (req, res) => {
	/*
	1. req 파싱
	2. DB에 있는지 확인
	3-1. DB에 있는 경우 꺼내오기
	3-2. DB에 없는 경우 기상청에 찌르기
	*/
		weatherModule.getRealTimeWeather(req, res);
	});
	/*자외선 지수 조회*/
	router.get(`/ultraRays.json`, (req, res) => {
		weatherModule.getUltraLife(req, res);
	});
	/*통합 대기환경지수 조회*/
	router.get(`/airPol.json`, (req, res) => {
		weatherModule.getAirCondition(req, res);
	});
	/*주간 날씨 정보 조회*/
	router.get(`/neighborHoodList.json`, (req, res) => {
		weatherModule.getWeekWeather(req, res);
	});
	
	return router;
};