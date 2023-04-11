const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Offer = require('../models/offer');

// Verify a vendor
router.patch('/vendor/:id', async (req, res) => {
    try {
        const vendor = await User.findByIdAndUpdate(req.params.id, {
            verified: true
        }, {
            new: true
        });
        res.send(vendor);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Verify an offer
router.patch('/offer/:id', async (req, res) => {
    try {
        const offer = await Offer.findByIdAndUpdate(req.params.id, {
            verified: true
        }, {
            new: true
        });
        res.send(offer);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;