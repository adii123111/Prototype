// Fake orders so the owner window has something to show.
// In the real project these come from your database: GET /api/orders
const d = (hoursAgo) => new Date(Date.now() - hoursAgo * 3600e3).toISOString();
const o = (ref, h, status, method, name, phone, address, city, pin, slot, notes, items) => ({
  ref, placedAt: d(h), status, method, details: { name, phone, address, city, pin, slot, notes },
  items, total: items.reduce((s, i) => s + i.amount, 0),
});

export const sampleOrders = [
  o("PB-1042", 1, "New", "COD", "Rohan Mehta", "9820011122", "Shop 4, Hill Road, Bandra West", "Mumbai", "400050", "Morning (6 - 10 AM)", "Wedding stage decor",
    [{ name: "Red Roses", qty: 100, unit: "stem", amount: 1200 }, { name: "Carnations", qty: 60, unit: "stem", amount: 1320 }]),
  o("PB-1041", 3, "Confirmed", "QR", "Priya Nair", "9890098900", "Flat 12, Shivaji Park Road, Dadar", "Mumbai", "400028", "Midday (10 AM - 2 PM)", "",
    [{ name: "Lilies", qty: 40, unit: "stem", amount: 2400 }]),
  o("PB-1040", 6, "Out for delivery", "COD", "Anil Joshi", "9769012345", "Siddhivinayak Temple Lane, Prabhadevi", "Mumbai", "400025", "Morning (6 - 10 AM)", "Call at the gate",
    [{ name: "Marigold", qty: 25, unit: "kg", amount: 2250 }, { name: "Jasmine (Mogra)", qty: 3, unit: "kg", amount: 1800 }]),
  o("PB-1039", 20, "Delivered", "QR", "Sana Sheikh", "9930077788", "Cafe Bloom, Linking Road, Santacruz West", "Mumbai", "400054", "Evening (2 - 7 PM)", "",
    [{ name: "Sunflowers", qty: 50, unit: "stem", amount: 1750 }]),
  o("PB-1038", 30, "Delivered", "COD", "Vikram Desai", "9004455667", "Hotel Palm, Andheri East", "Mumbai", "400069", "Morning (6 - 10 AM)", "Lobby arrangement",
    [{ name: "Orchids", qty: 30, unit: "stem", amount: 2400 }, { name: "Tulips", qty: 30, unit: "stem", amount: 1650 }]),
];
