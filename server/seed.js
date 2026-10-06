import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Nursery from "./models/Nursery.js";
import Donation from "./models/Donation.js";

dotenv.config();

// ================= NURSERIES DATA =================
const nurseries = [
  {
    name: "Green Garden Nursery",
    address: "MG Road, Near Metro Station",
    city: "Bangalore",
    phone: "+91 98765 43210",
    rating: 4.7,
    location: { type: "Point", coordinates: [77.5946, 12.9716] },
    plants: [
      { name: "Snake Plant", price: 250, stock: 20 },
      { name: "Money Plant", price: 150, stock: 35 },
      { name: "Peace Lily", price: 350, stock: 15 },
      { name: "Areca Palm", price: 400, stock: 12 },
      { name: "Aloe Vera", price: 120, stock: 40 },
    ],
  },
  {
    name: "Udyan Plant Store",
    address: "Lajpat Nagar, Central Market",
    city: "Delhi",
    phone: "+91 98765 11111",
    rating: 4.5,
    location: { type: "Point", coordinates: [77.2431, 28.5700] },
    plants: [
      { name: "Tulsi Plant", price: 80, stock: 50 },
      { name: "Jade Plant", price: 200, stock: 25 },
      { name: "Rubber Plant", price: 450, stock: 10 },
      { name: "Spider Plant", price: 180, stock: 30 },
    ],
  },
  {
    name: "Vrindavan Nursery",
    address: "Andheri West, Link Road",
    city: "Mumbai",
    phone: "+91 98765 22222",
    rating: 4.8,
    location: { type: "Point", coordinates: [72.8296, 19.1197] },
    plants: [
      { name: "Fiddle Leaf Fig", price: 899, stock: 8 },
      { name: "ZZ Plant", price: 550, stock: 18 },
      { name: "Boston Fern", price: 320, stock: 22 },
      { name: "Bamboo Palm", price: 480, stock: 14 },
      { name: "Chinese Money Plant", price: 380, stock: 20 },
    ],
  },
  {
    name: "Prakriti Plants",
    address: "Koregaon Park, Lane 5",
    city: "Pune",
    phone: "+91 98765 33333",
    rating: 4.6,
    location: { type: "Point", coordinates: [73.8930, 18.5362] },
    plants: [
      { name: "Rubber Plant", price: 420, stock: 15 },
      { name: "Snake Plant", price: 280, stock: 25 },
      { name: "Pothos (Golden)", price: 160, stock: 40 },
      { name: "Chinese Evergreen", price: 340, stock: 12 },
    ],
  },
  {
    name: "Bengal Botanicals",
    address: "Salt Lake Sector 5",
    city: "Kolkata",
    phone: "+91 98765 44444",
    rating: 4.4,
    location: { type: "Point", coordinates: [88.4309, 22.5735] },
    plants: [
      { name: "Peace Lily", price: 320, stock: 18 },
      { name: "Dracaena", price: 380, stock: 14 },
      { name: "Money Plant", price: 130, stock: 45 },
      { name: "Lucky Bamboo", price: 220, stock: 30 },
    ],
  },
  {
    name: "Deccan Greens",
    address: "Banjara Hills, Road No. 12",
    city: "Hyderabad",
    phone: "+91 98765 55555",
    rating: 4.5,
    location: { type: "Point", coordinates: [78.4482, 17.4126] },
    plants: [
      { name: "Areca Palm", price: 380, stock: 16 },
      { name: "Aloe Vera", price: 100, stock: 55 },
      { name: "Snake Plant", price: 240, stock: 28 },
      { name: "Jade Plant", price: 190, stock: 22 },
    ],
  },
  {
    name: "Chennai Plant Paradise",
    address: "T. Nagar, Pondy Bazaar",
    city: "Chennai",
    phone: "+91 98765 66666",
    rating: 4.3,
    location: { type: "Point", coordinates: [80.2341, 13.0418] },
    plants: [
      { name: "Money Plant", price: 140, stock: 38 },
      { name: "ZZ Plant", price: 520, stock: 12 },
      { name: "Spider Plant", price: 170, stock: 25 },
      { name: "Bamboo Palm", price: 460, stock: 10 },
    ],
  },
  {
    name: "Jaipur Garden Center",
    address: "C-Scheme, Ashok Marg",
    city: "Jaipur",
    phone: "+91 98765 77777",
    rating: 4.4,
    location: { type: "Point", coordinates: [75.7873, 26.9124] },
    plants: [
      { name: "Tulsi", price: 70, stock: 60 },
      { name: "Aloe Vera", price: 110, stock: 45 },
      { name: "Snake Plant", price: 230, stock: 20 },
      { name: "Jade Plant", price: 180, stock: 25 },
    ],
  },
  {
    name: "Ahmedabad Greenery",
    address: "SG Highway, Near ISKCON",
    city: "Ahmedabad",
    phone: "+91 98765 88888",
    rating: 4.6,
    location: { type: "Point", coordinates: [72.5078, 23.0300] },
    plants: [
      { name: "Rubber Plant", price: 400, stock: 14 },
      { name: "Peace Lily", price: 330, stock: 16 },
      { name: "Dracaena", price: 370, stock: 12 },
      { name: "Pothos", price: 150, stock: 35 },
    ],
  },
  {
    name: "Goa Plant Hub",
    address: "Panjim Market Road",
    city: "Goa",
    phone: "+91 98765 99999",
    rating: 4.7,
    location: { type: "Point", coordinates: [73.8278, 15.4909] },
    plants: [
      { name: "Fiddle Leaf Fig", price: 850, stock: 6 },
      { name: "Boston Fern", price: 300, stock: 20 },
      { name: "Chinese Money Plant", price: 360, stock: 18 },
      { name: "Bamboo Palm", price: 470, stock: 10 },
    ],
  },
  // Extra nurseries for denser coverage
  {
    name: "Blossom Garden Center",
    address: "Indiranagar, 100ft Road",
    city: "Bangalore",
    phone: "+91 98765 10101",
    rating: 4.5,
    location: { type: "Point", coordinates: [77.6410, 12.9784] },
    plants: [
      { name: "Peace Lily", price: 340, stock: 20 },
      { name: "Snake Plant", price: 260, stock: 30 },
      { name: "Pothos", price: 150, stock: 50 },
      { name: "Spider Plant", price: 190, stock: 25 },
    ],
  },
  {
    name: "Sacred Plants Store",
    address: "Karol Bagh, Ajmal Khan Road",
    city: "Delhi",
    phone: "+91 98765 20202",
    rating: 4.3,
    location: { type: "Point", coordinates: [77.1900, 28.6517] },
    plants: [
      { name: "Tulsi", price: 75, stock: 45 },
      { name: "Money Plant", price: 140, stock: 40 },
      { name: "Aloe Vera", price: 115, stock: 35 },
      { name: "Jade Plant", price: 195, stock: 22 },
    ],
  },
  {
    name: "Urban Jungle Mumbai",
    address: "Bandra West, Linking Road",
    city: "Mumbai",
    phone: "+91 98765 30303",
    rating: 4.9,
    location: { type: "Point", coordinates: [72.8260, 19.0600] },
    plants: [
      { name: "Monstera Deliciosa", price: 1200, stock: 5 },
      { name: "Fiddle Leaf Fig", price: 950, stock: 7 },
      { name: "ZZ Plant", price: 580, stock: 15 },
      { name: "Snake Plant", price: 290, stock: 25 },
    ],
  },
];

// ================= USERS DATA =================
const users = [
  { name: "Aarav Sharma", email: "aarav@example.com", city: "Bangalore", lat: 12.9716, lng: 77.5946 },
  { name: "Priya Patel", email: "priya@example.com", city: "Delhi", lat: 28.6139, lng: 77.2090 },
  { name: "Rohan Mehta", email: "rohan@example.com", city: "Mumbai", lat: 19.0760, lng: 72.8777 },
  { name: "Ananya Iyer", email: "ananya@example.com", city: "Chennai", lat: 13.0827, lng: 80.2707 },
  { name: "Kabir Khan", email: "kabir@example.com", city: "Pune", lat: 18.5204, lng: 73.8567 },
  { name: "Sneha Reddy", email: "sneha@example.com", city: "Hyderabad", lat: 17.3850, lng: 78.4867 },
  { name: "Vikram Singh", email: "vikram@example.com", city: "Jaipur", lat: 26.9124, lng: 75.7873 },
  { name: "Diya Nair", email: "diya@example.com", city: "Kolkata", lat: 22.5726, lng: 88.3639 },
  { name: "Arjun Verma", email: "arjun@example.com", city: "Bangalore", lat: 12.9352, lng: 77.6245 },
  { name: "Meera Joshi", email: "meera@example.com", city: "Delhi", lat: 28.5355, lng: 77.3910 },
  { name: "Karthik Nair", email: "karthik@example.com", city: "Mumbai", lat: 19.2183, lng: 72.9781 },
  { name: "Riya Sen", email: "riya@example.com", city: "Kolkata", lat: 22.5726, lng: 88.3639 },
  { name: "Ishaan Gupta", email: "ishaan@example.com", city: "Pune", lat: 18.5679, lng: 73.9143 },
  { name: "Tanvi Shah", email: "tanvi@example.com", city: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
  { name: "Aditya Rao", email: "aditya@example.com", city: "Hyderabad", lat: 17.4239, lng: 78.4738 },
  { name: "Nisha Kapoor", email: "nisha@example.com", city: "Jaipur", lat: 26.9124, lng: 75.7873 },
  { name: "Rahul Das", email: "rahul@example.com", city: "Goa", lat: 15.4909, lng: 73.8278 },
  { name: "Sanya Malhotra", email: "sanya@example.com", city: "Chennai", lat: 13.0827, lng: 80.2707 },
];

// ================= DONATIONS DATA =================
// Each donation is tied to a specific user (index into users array)
// so we get even distribution across cities.
const donationTemplates = [
  // --- Bangalore ---
  { userIdx: 0, title: "Money Plant Cuttings (10 pcs)", plantType: "Money Plant", description: "Healthy cuttings from a 3-year-old mother plant. Rooted and ready to plant. Pickup from my balcony.", quantity: 10 },
  { userIdx: 0, title: "Pothos Vine Cuttings", plantType: "Pothos", description: "Golden pothos vine cuttings with nodes. Root them in water for 2 weeks. Air purifying!", quantity: 8 },
  { userIdx: 8, title: "Snake Plant Pups", plantType: "Snake Plant", description: "Free pups separated from my large snake plant. Great for beginners — very low maintenance.", quantity: 3 },
  { userIdx: 8, title: "Spider Plant Babies", plantType: "Spider Plant", description: "Spider plant babies with roots already forming. Kid-friendly plant. Pet safe too!", quantity: 4 },

  // --- Delhi ---
  { userIdx: 1, title: "Tulsi Seeds + Sapling", plantType: "Tulsi", description: "Fresh tulsi sapling + a pack of seeds. Sacred plant, easy to grow. Good for health.", quantity: 2 },
  { userIdx: 1, title: "Jade Plant Cuttings", plantType: "Jade Plant", description: "Lucky jade plant cuttings — 4-5 inches long. Very easy to propagate. Let's spread luck!", quantity: 6 },
  { userIdx: 9, title: "Aloe Vera Baby Plants", plantType: "Aloe Vera", description: "Small aloe pups, 2-3 inches. Perfect for windowsill. Come with small pot if you want.", quantity: 5 },
  { userIdx: 9, title: "Rubber Plant Cutting", plantType: "Rubber Plant", description: "One big healthy cutting from my 5-year-old rubber tree. Already has aerial roots.", quantity: 1 },

  // --- Mumbai ---
  { userIdx: 2, title: "Peace Lily Division", plantType: "Peace Lily", description: "Divided my peace lily — 2 healthy plants available. Loves shade, beautiful white blooms.", quantity: 2 },
  { userIdx: 2, title: "ZZ Plant Rhizomes", plantType: "ZZ Plant", description: "ZZ plant rhizome divisions. Unkillable plant — perfect for busy people. Loves low light.", quantity: 2 },
  { userIdx: 10, title: "Lucky Bamboo Stalks", plantType: "Lucky Bamboo", description: "Lucky bamboo stalks, 6 inches. Grow in water with pebbles. Brings good luck and fortune!", quantity: 5 },
  { userIdx: 10, title: "Snake Plant Pups", plantType: "Snake Plant", description: "Two healthy snake plant pups in small pots. Perfect for beginners.", quantity: 2 },

  // --- Chennai ---
  { userIdx: 3, title: "Basil (Sabja) Seeds", plantType: "Sweet Basil", description: "Freshly harvested basil seeds from my kitchen garden. Great for pesto or Thai curries.", quantity: 15 },
  { userIdx: 3, title: "Money Plant Cuttings", plantType: "Money Plant", description: "Money plant cuttings with aerial roots. Ready to pot up immediately.", quantity: 12 },
  { userIdx: 17, title: "Aloe Vera Pups", plantType: "Aloe Vera", description: "Healthy aloe vera pups. Great for skin care and air purification.", quantity: 4 },

  // --- Pune ---
  { userIdx: 4, title: "Pothos Cuttings", plantType: "Pothos", description: "Marble queen pothos cuttings. Beautiful variegated leaves. Easy to root in water.", quantity: 6 },
  { userIdx: 12, title: "Rubber Plant Cutting", plantType: "Rubber Plant", description: "Big healthy cutting from a mature rubber tree. Has 3 leaves already.", quantity: 1 },

  // --- Hyderabad ---
  { userIdx: 5, title: "Jade Plant Cuttings", plantType: "Jade Plant", description: "Fresh jade cuttings. Brings prosperity. Very easy to grow.", quantity: 8 },
  { userIdx: 14, title: "Snake Plant Pups", plantType: "Snake Plant", description: "3 healthy snake plant pups. Extremely low maintenance.", quantity: 3 },

  // --- Jaipur ---
  { userIdx: 6, title: "Tulsi Plant", plantType: "Tulsi", description: "Sacred tulsi plant, ready to plant. Great for health and air purification.", quantity: 3 },
  { userIdx: 15, title: "Aloe Vera Babies", plantType: "Aloe Vera", description: "Fresh aloe pups from my garden. Perfect for home remedy uses.", quantity: 5 },

  // --- Kolkata ---
  { userIdx: 7, title: "Money Plant Cuttings", plantType: "Money Plant", description: "Fresh money plant cuttings. Two colors available — green and golden.", quantity: 10 },
  { userIdx: 11, title: "Spider Plant Babies", plantType: "Spider Plant", description: "Spider plant babies with roots. Great for hanging baskets.", quantity: 4 },

  // --- Ahmedabad ---
  { userIdx: 13, title: "Peace Lily Division", plantType: "Peace Lily", description: "Divided my peace lily into 2 plants. Both with healthy roots.", quantity: 2 },

  // --- Goa ---
  { userIdx: 16, title: "Basil Seeds", plantType: "Sweet Basil", description: "Organic basil seeds. Perfect for starting your kitchen garden.", quantity: 20 },
];

// ================= MAIN SEED FUNCTION =================
const seed = async () => {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected");

    console.log("🗑️  Clearing old data...");
    await User.deleteMany({});
    await Nursery.deleteMany({});
    await Donation.deleteMany({});
    console.log("✅ Cleared");

    // ---- Create users ----
    console.log("👥 Creating users...");
    const hashedPassword = await bcrypt.hash("password123", 10);
    const createdUsers = await User.insertMany(
      users.map((u) => ({
        name: u.name,
        email: u.email,
        password: hashedPassword,
        city: u.city,
        role: "user",
        location: { type: "Point", coordinates: [u.lng, u.lat] },
      }))
    );
    console.log(`✅ Created ${createdUsers.length} users (password: password123)`);

    // ---- Create nurseries ----
    console.log("🏡 Creating nurseries...");
    const createdNurseries = await Nursery.insertMany(nurseries);
    console.log(`✅ Created ${createdNurseries.length} nurseries`);

    // ---- Create donations ----
    console.log("🎁 Creating donations...");
    const donations = donationTemplates.map((d) => {
      const user = createdUsers[d.userIdx];
      // Jitter coordinates slightly so donations scatter around the user's area
      const [lng, lat] = user.location.coordinates;
      const jitter = () => (Math.random() - 0.5) * 0.03;
      return {
        donor: user._id,
        title: d.title,
        plantType: d.plantType,
        description: d.description,
        quantity: d.quantity,
        status: "available",
        city: user.city,
        location: {
          type: "Point",
          coordinates: [lng + jitter(), lat + jitter()],
        },
      };
    });
    const createdDonations = await Donation.insertMany(donations);
    console.log(`✅ Created ${createdDonations.length} donations`);

    // ---- Summary by city ----
    console.log("\n📊 Summary by city:");
    const cityCounts = {};
    createdDonations.forEach((d) => {
      cityCounts[d.city] = (cityCounts[d.city] || 0) + 1;
    });
    Object.entries(cityCounts).forEach(([city, count]) => {
      console.log(`   ${city}: ${count} donations`);
    });

    console.log("\n🎉 Seed complete!\n");
    console.log("📋 Test credentials:");
    console.log("   Email: aarav@example.com");
    console.log("   Password: password123");
    console.log("   (also works with any of the seeded emails)\n");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
};

seed();