const router = require("express-promise-router")()
const upload = require("../utils/multer");

const { member } = require('../controllers')

router.route('/:id').get(member.get)
router.route('/').post( upload.single("image"), member.create)
router.route('/').get(member.getAll)
router.route('/:id').put(upload.single("image"), member.update)
router.route('/:id').delete(member.delete)


module.exports = router;