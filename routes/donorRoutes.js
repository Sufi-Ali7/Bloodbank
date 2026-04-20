const express = require('express');
const Donation = require('../models/Donation');
const BloodRequest = require('../models/BloodRequest');
const Notification = require('../models/Notification');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/me', protect, async (req, res) => {
  const donations = await Donation.find({ donor: req.user._id });
  const totalDonations = donations.length;
  const totalLivesSaved = totalDonations * 3;
  const lastDonation = donations.sort((a, b) => new Date(b.donatedAt) - new Date(a.donatedAt))[0];
  const lastDonationText = lastDonation ? new Date(lastDonation.donatedAt).toLocaleDateString() : 'No donations yet';
  const daysUntilNextEligible = req.user.isEligible ? 0 : 90;

  res.json({
    user: req.user,
    totalDonations,
    totalLivesSaved,
    lastDonationVolume: lastDonation ? `${lastDonation.quantityMl}ml` : '0ml',
    lastDonationText,
    daysUntilNextEligible: `${daysUntilNextEligible} days`
  });
});

router.get('/donations', protect, async (req, res) => {
  const donations = await Donation.find({ donor: req.user._id }).sort({ donatedAt: -1 });
  res.json({ donations });
});

router.get('/requests', protect, async (req, res) => {
  const requests = await BloodRequest.find({ donorId: req.user._id }).sort({ createdAt: -1 });
  res.json({ requests });
});

router.patch('/availability', protect, async (req, res) => {
  req.user.isAvailable = !!req.body.isAvailable;
  if (!req.user.isEligible) req.user.isAvailable = false;
  await req.user.save();
  res.json({ message: 'Availability updated', isAvailable: req.user.isAvailable, isEligible: req.user.isEligible });
});

router.get('/notifications', protect, async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(50);
  res.json({ notifications });
});

module.exports = router;
