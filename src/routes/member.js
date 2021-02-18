const router = require("express-promise-router")()
const upload = require("../utils/multer");
const checkPermission = require("../utils/jwtCheckPermissions")

const { member } = require('../controllers')

router.route('/:id').get(member.get)
router.route('/').post(checkPermission, upload.single("image"), member.create)
router.route('/:id').put(checkPermission, upload.single("image"), member.update)
router.route('/:id').delete(checkPermission, member.delete)


module.exports = router;