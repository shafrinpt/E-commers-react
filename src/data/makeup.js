import makeupImg from "../assets/images/makeup.jpg";
// import foundationImg from "../assets/images/foundation.jpg";
import lipstickImg from "../assets/images/lipsticks.jpg";
// import eyelinerImg from "../assets/images/eyeliner.jpg";
// import blushImg from "../assets/images/blush.jpg";
// import mascaraImg from "../assets/images/mascara.jpg";

const makeup = [
  {
    id: 1,
    name: "Matte Lipstick",
    price: 499,
    image: lipstickImg ,
    description: "Long-lasting matte lipstick with rich color payoff.",
  },
  {
    id: 2,
    name: "Liquid Foundation",
    price: 899,
    image: makeupImg,
    description: "Lightweight full-coverage foundation for all-day wear.",
  },
  {
    id: 3,
    name: "Waterproof Eyeliner",
    price: 299,
    image: lipstickImg,
    description: "Precision tip eyeliner for perfect winged looks.",
  },
  {
    id: 4,
    name: "Blush Palette",
    price: 649,
    image: lipstickImg,
    description: "Vibrant blush shades to give your cheeks a natural glow.",
  },
  {
    id: 5,
    name: "Volumizing Mascara",
    price: 599,
    image: lipstickImg,
    description: "Smudge-proof mascara for fuller, longer lashes.",
  },
  {
    id: 6,
    name: "Highlighter Stick",
    price: 549,
    image: lipstickImg,
    description: "Creamy highlighter that adds instant glow to your look.",
  },
];

export default makeup;
