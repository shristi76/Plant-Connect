import Nursery from "../models/Nursery.js";

// GET /api/nurseries/nearby?lat=..&lng=..&radius=10
export const getNearbyNurseries = async (req, res) => {
  try {
    const { lat, lng, radius = 10 } = req.query;
    if (!lat || !lng) return res.status(400).json({ message: "lat & lng required" });

    const nurseries = await Nursery.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseFloat(radius) * 1000,
        },
      },
    }).limit(50);

    res.json(nurseries);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const createNursery = async (req, res) => {
  try {
    const nursery = await Nursery.create({ ...req.body, owner: req.user._id });
    res.status(201).json(nursery);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getAllNurseries = async (req, res) => {
  const list = await Nursery.find().limit(100);
  res.json(list);
};