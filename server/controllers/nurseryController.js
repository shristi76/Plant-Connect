import Nursery from "../models/Nursery.js";

// GET /api/nurseries/nearby?lat=..&lng=..&radius=10
export const getNearbyNurseries = async (req, res) => {
  try {
    const { lat, lng, radius = 10 } = req.query;
    const latitude = Number.parseFloat(lat);
    const longitude = Number.parseFloat(lng);
    const distance = Number.parseFloat(radius);

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      return res.status(400).json({ message: "Valid lat & lng required" });
    }

    if (!Number.isFinite(distance) || distance <= 0) {
      return res.status(400).json({ message: "radius must be a positive number" });
    }

    const nurseries = await Nursery.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [longitude, latitude] },
          $maxDistance: distance * 1000,
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