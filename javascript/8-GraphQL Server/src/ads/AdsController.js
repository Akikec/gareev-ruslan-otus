const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {insertAd, getAds, getUrls, getData} = require('./ads');
const {deleteAd, updateAd} = require('./ads');

const router = express.Router();

router.use(helmet());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cors());
router.use(morgan('combined'));
router.get('/', async (req, res) => {
    res.send(await getAds());
});
router.get('/urls', async (req, res) => {
    try {
        res.send(await getUrls());
    } catch (err) {
        console.log(err);
    }
});
router.get('/data', async (req, res) => {
    try {
        res.send(await getData());
    } catch (err) {
        console.log(err);
    }
});
router.post('/', async (req, res) => {
    const newAd = req.body;
    await insertAd(newAd);
    res.send({ message: 'New ad inserted.' });
});
router.delete('/:id', async (req, res) => {
    await deleteAd(req.params.id);
    res.send({ message: 'Ad removed.' });
});
router.put('/:id', async (req, res) => {
    const updatedAd = req.body;
    await updateAd(req.params.id, updatedAd);
    res.send({ message: 'Ad updated.' });
});
module.exports = router;