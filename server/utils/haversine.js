// Distance in km between two [lng, lat] points
export const distanceKm = (c1, c2) => {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const [lon1, lat1] = c1;
  const [lon2, lat2] = c2;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
};