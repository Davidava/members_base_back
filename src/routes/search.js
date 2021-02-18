const router = require("express-promise-router")()

const { member } = require('../controllers')

router.route('/:text').get(member.search)


module.exports = router;