import lipstickImg from "../assets/images/lipsticks.jpg";
import foundationImg from "../assets/images/makeup.jpg";
import eyelinerImg from "../assets/images/makeup.jpg";
import blushImg from "../assets/images/makeup.jpg";
import mascaraImg from "../assets/images/makeup.jpg";
import highlighterImg from "../assets/images/makeup.jpg";

const makeup = [
  {
    id: 1,
    name: "Matte Lipstick",
    price: 499,
    brand: "Maybelline",
    category: "Lips",
    image: lipstickImg,
    description: "Long-lasting matte lipstick with rich color payoff.",
  },
  {
    id: 2,
    name: "Liquid Foundation",
    price: 899,
    brand: "L'Oréal",
    category: "Face",
    image: foundationImg,
    description: "Lightweight full-coverage foundation for all-day wear.",
  },
  {
    id: 3,
    name: "Waterproof Eyeliner",
    price: 299,
    brand: "Lakme",
    category: "Eyes",
    image: eyelinerImg,
    description: "Precision tip eyeliner for perfect winged looks.",
  },
  {
    id: 4,
    name: "Blush Palette",
    price: 649,
    brand: "MAC",
    category: "Cheeks",
    image: blushImg,
    description: "Vibrant blush shades to give your cheeks a natural glow.",
  },
  {
    id: 5,
    name: "Volumizing Mascara",
    price: 599,
    brand: "Maybelline",
    category: "Eyes",
    image: mascaraImg,
    description: "Smudge-proof mascara for fuller, longer lashes.",
  },
  {
    id: 6,
    name: "Highlighter Stick",
    price: 549,
    brand: "Nykaa",
    category: "Face",
    image: highlighterImg,
    description: "Creamy highlighter that adds instant glow to your look.",
  },
];

export default makeup;
