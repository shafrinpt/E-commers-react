import skinCare from "../assets/images/skincare.jpg";
import dotAndkey from "../assets/images/skicare/olay.moi.jpg"
import Clinic from "../assets/images/skicare/clinic-moi.jpg"
import dermaCo  from "../assets/images/skicare/der-serum.jpg"
import centalla  from "../assets/images/skicare/toner.jpg"
import vasline  from "../assets/images/skicare/body-l.jpg"
import beauty  from "../assets/images/skicare/b-sunscreen.jpg"
import cosrx from "../assets/images/moiturizer.jpg";
import cerave  from "../assets/images/skicare/sun-cerave.jpg"
import ponds  from "../assets/images/skicare/ponds-moi.jpg"
import cleanser  from "../assets/images/skicare/moiturizer1.jpg"
import cetaphils  from "../assets/images/skicare/cleancer-cetaphil.jpg"
import cosrxSerum  from "../assets/images/skicare/cosrx-toner.jpg"

const skincare = [
  {
    id: 1,
    name: "Super Brighter Moiturizer",
    brand: "Olay",
    category: "Moisturizer",
    skinType: "All Skin Types",
    price: 396,
    image: dotAndkey,
    description: "Hydrating face cream that nourishes and refreshes your skin.",
  },
  {
    id: 2,
    name: "Light Weight Gel Moiturizer",
    brand: "Clinique",
    category: "Moisturizer",
    skinType: "Normal",
    price: 2250,
    image: Clinic ,
    description: "Lightweight moisturizer perfect for daily skincare routine.",
  },
  {
    id: 3,
    name: "Vitamin C Serum",
    brand: "The derma co",
    category: "Serum",
    skinType: "Normal",
    price: 487,
    image: dermaCo,
    description: "Fades Spots, Reduces Pigmentation & Brightens Skin.",
  },
  {
    id: 4,
    name: "Madagascar Centella Toning Toner",
    brand: "Centalla",
    category: "Toner",
    skinType: "Sensitive",
    price: 1527,
    image: centalla,
    description: "Gives your skin a fresh glow and keeps it hydrated all day.",
  },
  {
    id: 5,
    name: "Gluta-Hya Dewy Body Lotion",
    brand: "Vasline",
    category: "Cream",
    skinType: "Sensitive",
    price: 323,
    image: vasline,
    description: "Vaseline Gluta-Hya Dewy Radiance Lotion Bright, Glowing Skin Glutathione Infused Moisturizer.",
  },
  {
    id: 6,
    name: "Sunscreen SPF 50",
    brand: "Beauty Of Joseon",
    category: "Sunscreen",
    skinType: "Combination",
    price: 1413,
    image: beauty,
    description: "Beauty Of Joseon Relief Sunscreen Rice + Probiotics SPF 50+ PA++++.",
  },
    {
    id: 7,
    name: "COSRX Advanced Snail Serum",
    brand: "COSRX",
    category: "Serum",
    skinType: "Combination",
    price: 1450,
    image: cosrx,
    description: "Protects your skin from harmful UV rays with SPF 50.",
  },
  {
    id: 8,
    name: "CeraVe Mineral Sunscreen SPF 50",
    brand: "CeraVe",
    category: "Sunscreen",
    skinType: "Oily Skin",
    price: 1923,
    image: cerave,
    description: "Protects your skin from harmful UV rays with SPF 50.",
  },
  {
    id: 9,
    name: "Super Light Gel Moiturizer",
    brand: "PONDS",
    category: "Moisturizer",
    skinType: "Oily Skin",
    price: 296,
    image: ponds,
    description: "Transform your oily, acne-prone skin with the NEW Pond's ",
  },
  {
    id: 10,
    name: "Hydrating Facial Cleancer",
    brand: "CeraVe",
    category: "Cleance",
    skinType: "Oily Skin",
    price: 1188,
    image: cleanser,
    description: "CeraVe Blemish Control Cleanser with 2% Salicylic Acid & Niacinamide for Acne-prone skin",
  },
  {
    id: 11,
    name: "COSRX - Toner",
    brand: "COSRX",
    category: "Toner",
    skinType: "Oily Skin",
    price: 1305,
    image: cosrxSerum,
    description: "COSRX Advanced Snail 96 Mucin Power Essence",
  },
  {
    id: 12,
    name: "COSRX Advanced Moiturizer",
    brand: "Cetaphil",
    category: "Cleance",
    skinType: "Normal",
    price: 1450,
    image: cetaphils,
    description: "Protects your skin from harmful UV rays with SPF 50.",
  },
];

export default skincare;
