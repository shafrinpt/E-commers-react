// import makeupImg from "../assets/images/makeup.jpg";
// import skinCare from "../assets/images/skincare.jpg";
// import perfume from "../assets/images/perfume.jpg";
// import dotAndkey1 from "../assets/images/skicare/olay.moi.jpg"
// import Clinic1 from "../assets/images/skicare/clinic-moi.jpg"
// import dermaCo1  from "../assets/images/skicare/der-serum.jpg"
// import centalla1  from "../assets/images/skicare/toner.jpg"
// import vasline1  from "../assets/images/skicare/body-l.jpg"
// import beauty1  from "../assets/images/skicare/b-sunscreen.jpg"
// import perfume1 from "../assets/images/perfume-luxe.jpg";
// import prada1 from "../assets/images/prada.jpg";
// import bella1 from "../assets/images/perfume/bellavita.jpg";
// import gucci1 from "../assets/images/perfume/gucci.jpg";
// import cr1 from "../assets/images/perfume/cr7.jpg";
// import dior1 from "../assets/images/perfume/dior-perfume.jpg";
// import lipstickImg1 from "../assets/images/lipsticks.jpg";
// import pixi1 from "../assets/images/makeup/blush-pixi.jpg";
// import blush1 from "../assets/images/makeup/blush.jpg";
// import fenty1 from "../assets/images/makeup/concealer-fenty.jpg";
// import diorm from "../assets/images/makeup/dior-found.jpg";
// import elf1 from "../assets/images/makeup/elf-eye.jpg";
// import eyeShadow1 from "../assets/images/makeup/eye-shadow.jpg";
// import  kay1 from "../assets/images/makeup/kay-lip.jpg";
// // import oud from "../assets/images/perfume/oud.jpg";
// import cosrxSerum1  from "../assets/images/skicare/cosrx-toner.jpg"

// const products = [
//   {
//       id: 1,
//       name: "Super Brighter Moiturizer",
//       brand: "Olay",
//       category: "Moisturizer",
//       skinType: "All Skin Type",
//       price: 396,
//       image: dotAndkey1,
//       description: "Hydrating face cream that nourishes and refreshes your skin.",
//     },
//     {
//       id: 2,
//       name: "Light Weight Gel Moiturizer",
//       brand: "Clinique",
//       category: "Moisturizer",
//       skinType: "All Skin Types",
//       price: 2250,
//       image: Clinic1 ,
//       description: "Lightweight moisturizer perfect for daily skincare routine.",
//     },
//     {
//       id: 3,
//       name: "Vitamin C Serum",
//       brand: "The derma co",
//       category: "Serum",
//       skinType: "Normal",
//       price: 487,
//       image: dermaCo1,
//       description: "Fades Spots, Reduces Pigmentation & Brightens Skin.",
//     },
//     {
//       id: 4,
//       name: "Madagascar Centella Toning Toner",
//       brand: "Centalla",
//       category: "Toner",
//       skinType: "Sensitive",
//       price: 1527,
//       image: centalla1,
//       description: "Gives your skin a fresh glow and keeps it hydrated all day.",
//     },
//     {
//       id: 5,
//       name: "Gluta-Hya Dewy Body Lotion",
//       brand: "Vasline",
//       category: "Cream",
//       skinType: "All Skin Types",
//       price: 323,
//       image: vasline1,
//       description: "Vaseline Gluta-Hya Dewy Radiance Lotion Bright, Glowing Skin Glutathione Infused Moisturizer.",
//     },
//     {
//       id: 6,
//       name: "Sunscreen SPF 50",
//       brand: "Beauty Of Joseon",
//       category: "Sunscreen",
//       skinType: "All Skin Types",
//       price: 1413,
//       image: beauty1,
//       description: "Beauty Of Joseon Relief Sunscreen Rice + Probiotics SPF 50+ PA++++.",
//     },
//     {
//       id: 7,
//       name: "Orange Blossom Cologne",
//       price: 15741,
//       brand: "Jo Malone",
//       forWhom: "Women",
//       concentration: "EDP",
//       image: perfume1,
//       description: "Combiners to create a scent that’s uniquely you..",
//     },
//     {
//       id: 8,
//       name: "PRADA Paradoxe Eau",
//       price: 13800,
//       brand: "Prada",
//       forWhom: "Women",
//       concentration: "EDT",
//       image: prada1,
//       description: "white flowers bouquet with the avant-garde of an ambrofix .",
//     },
//     {
//       id: 9,
//       name: "Bella Vita Organic CEO Man",
//       price: 849,
//       brand: "bellavita",
//       forWhom: "Men",
//       concentration: "EDP",
//       image: bella1,
//       description: "A rich and long-lasting oriental fragrance.",
//     },
//     {
//       id: 10,
//       name: "Gucci Bamboo",
//       price: 11100,
//       brand: "Gucci",
//       forWhom: "Women",
//       concentration: "EDT",
//       image: gucci1,
//       description: "a new fragrance for today's multi-faceted woman.",
//     },
//     {
//       id: 11,
//       name: "Cristiano Ronaldo Cr7",
//       price: 2450,
//       brand: "Cristiano Ronaldo",
//       forWhom: "Men",
//       concentration: "EDC",
//       image: cr1,
//       description: "Every day fragrance for a lifestyle touch.",
//     },
//     {
//       id: 12,
//       name: " Miss Dior",
//       price: 12100,
//       brand: "DIOR",
//       forWhom: "Women",
//       concentration: "Parfum",
//       image: dior1,
//       description: "the beauty of a sensual Grasse rose wrapped in fresh notes.",
//     },
//     {
//         id: 13,
//         name: "M.A.C MACximal Matte-Lipstick",
//         price: 2550,
//         brand: "M.A.C",
//         category: "Lips",
//         image: lipstickImg1,
//         description: "Long-lasting matte lipstick with rich color payoff.",
//       },
//       {
//         id: 14,
//         name: "Pixi By Petra On The Glow Blush",
//         price: 1950,
//         brand: "Pixi",
//         category: "Cheeks",
//         image: pixi1,
//         description: "Lightweight full-coverage foundation for all-day wear.",
//       },
//       {
//         id: 15,
//         name: "Waterproof EyelinerSoft Pinch Liquid Blush",
//         price: 2219,
//         brand: "Rare Beauty",
//         category: "Cheeks",
//         image: blush1,
//         description: "Precision tip eyeliner for perfect winged looks.",
//       },
//         {
//           id: 16,
//           name: "COSRX - Toner",
//           brand: "COSRX",
//           category: "Toner",
//           skinType: "Oily Skin",
//           price: 1305,
//           image: cosrxSerum1,
//           description: "COSRX Advanced Snail 96 Mucin Power Essence",
//         },
//       {
//         id: 17,
//         name: "Fenty Beauty Longwear Concealer",
//         price: 3425,
//         brand: "Fenty Beauty",
//         category: "Face",
//         image: fenty1,
//         description: "Fenty Beauty Pro Filt'r Instant Retouch Concealer.",
//       },
//       {
//         id: 18,
//         name: "DIOR Backstage Face & Body Foundation",
//         price: 4700,
//         brand: "DIOR",
//         category: "Face",
//         image: diorm,
//         description: "The go-to face and body foundation for House of DIOR runway shows.",
//       },
//       {
//         id: 19,
//         name: "e.l.f. Cosmetics Expert Liquid Eyeliner",
//         price: 360,
//         brand: "e.l.f",
//         category: "Eyes",
//         image:elf1,
//         description: "pulling on your eyelids with this easy glide e.l.f Expert Liquid Liner.",
//       },
//        {
//         id: 20,
//         name: "Kay Beauty Multi Texture Eyeshadow Palette ",
//         price: 1799,
//         brand: "Kay Beauty",
//         category: "Eyes",
//         image: eyeShadow1,
//         description: "A Night Glam Palette Thats Perfect for High Impact eye look.",
//       },
//       {
//         id: 21,
//         name: "Kay Beauty Hydra Creme Lipstick",
//         price: 899,
//         brand: "Kay Beauty",
//         category: "Lips",
//         image:kay1,
//         description: "our most hydrating lip colour ever.",
//       },
// ];

// export default products;
