export type Review = {
  name: string;
  city: string;
  product?: string;
  text?: string; // customer ne jo likha
  image?: string; // WhatsApp screenshot, file public/reviews/ folder mein rakho
};

export const REVIEWS: Review[] = [
  { name: "Ali", city: "Karachi", image: "/reviews/1.jpg" },
  { name: "Ayesha", city: "Lahore", product: "Hair Oil", text: "Customer ka asli likha hua message" },
];
