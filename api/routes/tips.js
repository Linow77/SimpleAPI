const express = require('express')
const router = express.Router()

const TipsController = require('../controllers/tips')

router.route('/').get(TipsController.getAllTips).post(TipsController.createTips)
router.route('/name/:tipsName').get(TipsController.getTipsByName)

router
  .route('/:tipsId')
  .get(TipsController.getTipsById)
  .put(TipsController.updateTips)
  .delete(TipsController.deleteTips)
// router
//   .route('/:contentId')
//   .get(Controller.getWebinarById)
//   .put(Controller.contentUpdate)
//   .delete(Controller.contentDelete)

module.exports = router
