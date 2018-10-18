var logger = require('morgan');

module.exports = (app) => {
	const express = require(`express`);
	const router = express.Router();
	
	/*날씨*/
	const weatherRouter = require(`./weatherRouter`)(app);
	app.use(`/weather`, weatherRouter);

	router.get(`/`, (req, res) => {
		res.send(`hello`);
	});

	return router;
};