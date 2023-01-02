const express = require('express');
const router = express.Router();
const cors = require('cors')
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args))

const url = process.env.API_URL
const key = process.env.API_KEY

router.use(cors())

router.get('/:type/:character/:filter', async (req, res) => {
    const type = req.params.type
    const character = req.params.character
    const filter = req.params.filter
    const response = await fetch(`${url}${type}/${character}?api_key=${key}&format=json&${filter}`)
    res.json(await response.json())
})

module.exports = router;