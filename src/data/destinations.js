const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const destinations = [
  { id: "paris", city: "Paris", country: "France", image: u("photo-1502602898657-3e91760cbb34"), alt: "The Eiffel Tower over Paris at golden hour" },
  { id: "dubai", city: "Dubai", country: "UAE", image: u("photo-1512453979798-5ea266f8880c"), alt: "Dubai skyline with the Burj Khalifa at dusk" },
  { id: "tokyo", city: "Tokyo", country: "Japan", image: u("photo-1540959733332-eab4deabeeaf"), alt: "Neon-lit streets of Tokyo at night" },
  { id: "santorini", city: "Santorini", country: "Greece", image: u("photo-1570077188670-e3a8d69ac5ff"), alt: "White buildings and blue domes of Santorini" },
  { id: "maldives", city: "Maldives", country: "Maldives", image: u("photo-1514282401047-d79a71a590e8"), alt: "Overwater villas above turquoise Maldivian water" },
];
