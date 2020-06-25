const app = require('./app');
const {startDatabase} = require('./database/mongo');
const {insertAd} = require('./ads/ads');

startDatabase().then(async () => {
    await insertAd({
        title: 'Simple Feed Blog Feed.',
        url: "https://www.feedforall.com/sample-feed.xml"
    });

    const port = process.env.PORT || 3001;
    app.listen(port, async () => {
        console.log('listening on port ' + port);
    });
});