const createApp = require('./app');
const port = 3000;

const { app } = createApp();

app.listen(port, () => {
    console.log('We are live on ' + port);
});
