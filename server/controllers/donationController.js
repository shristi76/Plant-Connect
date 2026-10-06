import Donation from "../models/Donation.js";

export const createDonation = async (req, res) => {
  try {
    const { title, plantType, description, image, quantity, lat, lng, city } = req.body;
    const donation = await Donation.create({
      donor: req.user._id,
      title,
      plantType,
      description,
      image,
      quantity,
      city,
      location: { type: "Point", coordinates: [lng, lat] },
    });
    res.status(201).json(donation);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getNearbyDonations = async (req, res) => {
  try {
    const { lat, lng, radius = 15 } = req.query;
    const list = await Donation.find({
      status: "available",
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseFloat(radius) * 1000,
        },
      },
    }).populate("donor", "name city");
    res.json(list);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const claimDonation = async (req, res) => {
  try {
    const d = await Donation.findByIdAndUpdate(
      req.params.id,
      { status: "claimed", claimedBy: req.user._id },
      { new: true }
    );
    res.json(d);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getMyDonations = async (req, res) => {
  const list = await Donation.find({ donor: req.user._id });
  res.json(list);
};