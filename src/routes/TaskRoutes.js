const express = require('express');
const router = express.Router();

const TaskController= require('../controllers/TaskController');
const TaskValidation= require('../middlewares/TaskValidation');



router.post('/', TaskValidation,TaskController.create);

router.put('/:id',TaskController.update);
router.put('/:id/:done',TaskController.done)

router.get('/filter/all/:macadress',TaskController.all);
router.get('/:id',TaskController.show);
router.get('/filter/late/:macadress',TaskController.late);
router.get('/filter/today/:macadress',TaskController.today);
router.get('/filter/week/:macadress',TaskController.week);
router.get('/filter/month/:macadress',TaskController.month);
router.get('/filter/year/:macadress',TaskController.year);

router.delete('/:id',TaskController.delete);



module.exports= router;