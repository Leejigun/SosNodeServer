module.exports = (app) => {
	const express = require(`express`);
	const router = express.Router();
	
	/*날씨*/
	const weatherRouter = require(`./weatherRouter`)(app);
	app.use(`/weather`, weatherRouter);

	return router;
};