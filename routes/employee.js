
const express = require('express');
const router = express.Router();
// const passport = require('passport');
// ///Controllers 
 const AuthController = require('../controllers/authController');
 const DeviceController=require('../controllers/DeviceController');
// //Login
// //Registration
// //add Device
// router.post('/addDevice', DeviceController.addDevice);
// router.get('/getDevice/:imei', DeviceController.findDevice);
// router.post('/createFile/:imei', DeviceController.CreateFicheIntervention);
// router.post('/getIntervention/:imei', DeviceController.getInterventionsData);
router.post('/login', AuthController.login);
 router.post('/register', AuthController.reg);

router.get('/getByImei/:id',DeviceController.getDeviceData)
router.post('/addDevice',DeviceController.AddDevice)
router.post('/createIntervention/:imei',DeviceController.CreateFicheIntervention)
router.get('/getinterventionData/:imei',DeviceController.getInterventionsData)
module.exports = router;

