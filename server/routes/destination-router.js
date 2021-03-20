const express = require('express');

const DestinationCtrl = require('../controllers/destination-controller');

const router = express.Router();

router.post('/destination', DestinationCtrl.createDestination);
router.put('/destination/:id', DestinationCtrl.updateDestination);
router.delete('/destination/:id', DestinationCtrl.deleteDestination);
router.get('/destination/:id',DestinationCtrl.getDestinationById);
router.get('/destinations', DestinationCtrl.getDestinations);

module.exports = router