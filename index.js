/* express settup */
let express = require('express');
const app = express();
const scheduler = require(`./modules/weatherScheduler`);
const apiRecoder = require(`./modules/serverRecorder`);
/*router settup*/
const router = require(`./routers/mainRouter`)(app);
app.use(`/`, router);

app.listen(3000, () => {
	console.log(`Server running at 3000 port`);
	apiRecoder.runAPIRecorder();
});