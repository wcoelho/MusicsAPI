const express = require('express');

const api_prefix = '/api/v1'

const router = express.Router();

const musicRoute = require('./music');
const artistRoute = require('./artist');
const lyricRoute = require('./lyric');

router.use(`${api_prefix}/`, musicRoute);

router.use(`${api_prefix}/musicas`, musicRoute);
router.use(`${api_prefix}/artistas`, artistRoute);
router.use(`${api_prefix}/letras`, lyricRoute);

module.exports = router;