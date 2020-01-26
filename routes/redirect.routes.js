const {Router} = require('express')
const router = Router()
const Link = require('../models/Link')

router.get('/:code', async (req, res) =>{
    try {
        const link = await Link.findOne({code: req.params.code})
        if(link){
            link.clicks++
            await link.save()
            res.redirect(link.from)
        }

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попрубойте снова'})
    }
})

module.exports = router