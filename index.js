/* express settup */
let express = require('express');
const app = express();

/*router settup*/
const router = require(`./routers/mainRouter`)(app);
app.use(`/`, router);

app.listen(3000, () => {
	console.log(`Server running at 3000 port`);
});