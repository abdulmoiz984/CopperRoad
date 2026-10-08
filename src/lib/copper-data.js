/**
 * Ported 1:1 from Project/src/lib/copper-data.ts.
 * Photographs resolve through the local image barrel rather than the
 * staging host the web build points at, so the app works offline.
 */
import { IMAGES } from '../assets/images';

export const logoSrc = IMAGES.logo;

export const CONTACT = {
  address: "202 E 4th St., Fulton, SD 57340",
  street: "202 E 4th St.",
  city: "Fulton, SD 57340",
  email: "CopperRoadMC@yahoo.com",
  phone: "+1 (605) 630-3008",
  phoneHref: "tel:+16056303008",
  emailHref: "mailto:CopperRoadMC@yahoo.com",
  maps: "https://maps.google.com/?q=202+E+4th+St,+Fulton,+SD+57340",
  mapEmbed:
    "https://maps.google.com/maps?q=202+E+4th+St,+Fulton,+SD+57340&z=15&output=embed",
};

export const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC",
];



export const cats = [
  {
    id: "aria",
    name: "Aria",
    short: "Aria",
    tagline: "The Majestic Black Smoke",
    role: "queen",
    sex: "Female",
    coat: "Black Smoke",
    photo: IMAGES.rectangle10,
    gallery: [IMAGES.rectangle10, IMAGES.kittenBlackSmoke, IMAGES.rectangle6],
    bio: "Aria is our stunning Black Smoke Maine Coon queen, and she's every bit as regal as she looks. With her thick, smoky coat and commanding stature, she turns heads wherever she goes. But beneath that majestic exterior lies a heart full of maternal warmth.",
    health: "Screened in program for HCM, SMA, and PK deficiency, with DNA review.",
    pedigreeNote: "Certified 5-generation pedigree. TICA registered.",
  },
  {
    id: "olive",
    name: "Olive",
    short: "Olive",
    tagline: "The Whimsical Polydactyl Calico",
    role: "queen",
    sex: "Female",
    coat: "Tortie (Calico) with White",
    photo: IMAGES.placeholder_Olive,
    gallery: [IMAGES.placeholder_Olive, IMAGES.kittenCalico, IMAGES.rectangle105],
    bio: "This gorgeous Tortie (Calico) with white Maine Coon is a true heart-stealer! With her vibrant patches of color and adorable polydactyl “mitten” paws, Olive is as unique as she is beautiful. Her playful spirit and affectionate nature light up every room she enters. Whether she's chasing toys or cuddling up for snuggles, Olive brings joy to everyone around her.",
    health: "Screened in program for HCM, SMA, and PK deficiency, with DNA review.",
    pedigreeNote: "Certified 5-generation pedigree. TICA registered.",
  },
  {
    id: "kiki",
    name: 'Niagara "KiKi"',
    short: "KiKi",
    tagline: "The Moscow Beauty",
    role: "queen",
    sex: "Female",
    coat: "Black Smoke Polydactyl",
    photo: IMAGES.kiki,
    gallery: [IMAGES.kiki, IMAGES.rectangle102, IMAGES.kittenBlackSmoke],
    bio: "This stunning Black Smoke Polydactyl Maine Coon is pure mystery and majesty. With her smoky, ethereal coat and captivating presence, KiKi turns heads wherever she goes. Imported from Moscow, she brings a touch of international elegance and a strong, regal lineage to our cattery. Her unique look and gentle charm make her truly unforgettable. She's playful, affectionate, and—bonus!—a total talker. Whether she's chirping for attention or chatting about her day, KiKi always has something to say.",
    health: "Screened in program for HCM, SMA, and PK deficiency, with DNA review.",
    pedigreeNote: "Certified 5-generation pedigree. TICA registered.",
  },
  {
    id: "chimera",
    name: 'Chimera "Squeaks"',
    short: "Squeaks",
    tagline: "The Two-Faced Beauty",
    role: "queen",
    sex: "Female",
    coat: "Chimera",
    photo: IMAGES.rectangle103,
    gallery: [IMAGES.rectangle103, IMAGES.rectangle61, IMAGES.motherKittens],
    bio: "It doesn't refer to a deceitful feline. It refers to a chimera cat—a fascinating and rare genetic phenomenon. Chimera, lovingly called Squeaks, carries that wonder in a striking coat and a gentle, curious nature. She holds a special place among the Queens of Copper Road.",
    health: "Screened in program for HCM, SMA, and PK deficiency, with DNA review.",
    pedigreeNote: "Certified 5-generation pedigree. TICA registered.",
  },
  {
    id: "roman",
    name: "Roman",
    short: "Roman",
    tagline: "Regal High Silver Shaded Boy",
    role: "king",
    sex: "Male",
    coat: "High Silver Shaded",
    photo: IMAGES.placeholder_Roman,
    gallery: [IMAGES.placeholder_Roman, IMAGES.placeholder_Roman1, IMAGES.placeholder_Roman2],
    bio: "Roman is a breathtaking High Silver Maine Coon from our shaded line from Moldovia, and he's pure feline royalty. His luxurious coat glimmers in the light, catching every eye in the room, while his proud, majestic presence leaves a lasting impression. With elegant features and a calm, composed demeanor, Roman exudes grace and strength. He's not just a standout—he's unforgettable.",
    health: "Screened in program for HCM, SMA, and PK deficiency, with DNA review.",
    pedigreeNote: "Certified 5-generation pedigree. TICA registered.",
  },
  {
    id: "royal",
    name: "Royal",
    short: "Royal",
    tagline: "King Of The Cattery",
    role: "king",
    sex: "Male",
    coat: "Blue Smoke Tabby",
    photo: IMAGES.rectangle106,
    gallery: [IMAGES.rectangle106, IMAGES.rectangle104, IMAGES.kittenBlueSmoke],
    bio: "Royal is a striking Blue Smoke Tabby Maine Coon with a powerful presence and a soft, smoky coat that shimmers with elegance. As a future King, Royal embodies the strength, beauty, and gentle temperament we strive for in our breeding program. Son of Rudi.",
    health: "Screened in program for HCM, SMA, and PK deficiency, with DNA review.",
    pedigreeNote: "Certified 5-generation pedigree. Son of RUDI. TICA registered.",
  },
  {
    id: "butter",
    name: "Butter",
    short: "Butter",
    tagline: "Sunshine In Fur Form",
    role: "king",
    sex: "Male",
    coat: "Red Tabby Polydactyl",
    photo: IMAGES.rectangle107,
    gallery: [IMAGES.rectangle107, IMAGES.kittenRedTabby, IMAGES.happyKittenInHands],
    bio: "Butter is our cheerful Red Tabby Maine Coon with the most adorable polydactyl paws—like he's always wearing fuzzy mittens! His warm coloring and playful spirit light up every room he enters. Whether he's chasing toys, exploring new corners, or curling up for a nap, Butter brings joy and energy to the cattery. He's a little ray of sunshine wrapped in fur, and we couldn't love him more!",
    health: "Screened in program for HCM, SMA, and PK deficiency, with DNA review.",
    pedigreeNote: "Certified 5-generation pedigree. TICA registered.",
  },
  {
    id: "armani",
    name: "Armani",
    short: "Armani",
    tagline: "The Silent Visitor",
    role: "king",
    sex: "Male",
    coat: "Black Smoke",
    photo: IMAGES.rectangle11,
    gallery: [IMAGES.rectangle11, IMAGES.rectangle6, IMAGES.kittenBlackSmoke],
    bio: "Armani is a BIG Black Smoke Maine Coon with a majestic build and a heart full of quiet affection. Known for his gentle nature and calm demeanor, Armani brings a peaceful presence to our breeding program. Though he lives about 7 miles from Copper Road, his visits—courtesy of Dakota Majestic Maine Coons—are always special. Armani arrives with grace, charm, and a touch of mystery, making every moment with him feel like a gift.",
    health: "Screened in program for HCM, SMA, and PK deficiency, with DNA review.",
    pedigreeNote: "Certified 5-generation pedigree. TICA registered.",
  },
  {
    id: "london",
    name: "London",
    short: "London",
    tagline: "The Heart And Soul Of The Nursery",
    role: "family",
    sex: "Female",
    coat: "Maine Coon",
    photo: IMAGES.placeholder_London1,
    gallery: [IMAGES.placeholder_London1, IMAGES.placeholder_London2, IMAGES.playfulKittensGroupPhoto],
    bio: "London is the heart and soul of Copper Road's nursery. With her gentle spirit and nurturing instincts, she has become the official welcome wagon—greeting new arrivals with warmth and curiosity—and the beloved nanny to every litter born in the cattery. Though she cannot have kittens of her own, London's maternal nature shines through in every cuddle, every watchful gaze, and every soft purr she offers to the babies. She's a calming presence, a loyal companion, and a cherished member of the Copper Road family.",
    health: "Loved and cared for as a member of the family.",
    pedigreeNote: "Forever part of our family. Not a breeding cat.",
  },
  {
    id: "rudi",
    name: "RUDI",
    short: "RUDI",
    tagline: "The Heart Of Copper Road",
    role: "memorial",
    sex: "Male",
    coat: "Maine Coon",
    photo: IMAGES.rudiTheFoundingMaineCoon,
    gallery: [IMAGES.rudiTheFoundingMaineCoon, IMAGES.placeholder_Rudi1, IMAGES.placeholder_Rudi11, IMAGES.placeholder_Rudi12],
    bio: "Forever in our hearts, RUDI was more than just a cat—he was the soul of our cattery and the beginning of everything we've built at Copper Road. With his wisdom, strength, and gentle spirit, RUDI laid the foundation for generations of beautiful Maine Coons. His presence brought comfort, joy, and a sense of purpose to everyone who met him. We miss you, RUDI. You will always be the heart of Copper Road. “Some souls leave paw prints on our hearts forever.”",
    health: "In loving memory.",
    pedigreeNote: "Founding cat of Copper Road. Sire of Royal.",
  },
  {
    id: "poppy",
    name: "Poppy",
    short: "Poppy",
    tagline: "Mittened And Full Of Character",
    role: "family",
    sex: "Female",
    coat: "Classic Tabby Polydactyl",
    photo: IMAGES.placeholder_Poppy,
    gallery: [IMAGES.placeholder_Poppy],
    bio: "Poppy is a true standout in the Copper Road family. Her extra toes give her a unique, mittened appearance that everyone falls in love with. She's playful, curious, and full of character—always ready to explore or snuggle up for a cozy nap. Her classic tabby coloring paired with her charming personality makes her a favorite among visitors and a joy to have in the cattery.",
    health: "Cared for within the Copper Road home.",
    pedigreeNote: "Part of the Copper Road family.",
  },
  {
    id: "iris",
    name: "Iris",
    short: "Iris",
    tagline: "Quiet Grace",
    role: "queen",
    sex: "Female",
    coat: "Maine Coon",
    photo: IMAGES.placeholder_Iris,
    gallery: [IMAGES.placeholder_Iris],
    bio: "Iris is the heart of Copper Road—sweet, quiet, and endlessly nurturing. She's a devoted mother who adores her babies, often seen cuddling them close or softly chirping lullabies. Her calm and gentle nature makes her a favorite among both humans and felines alike. Though she carries herself with quiet grace, Iris's presence is powerful. She doesn't need to demand attention—she simply earns it with her warmth and wisdom.",
    health: "Screened in program for HCM, SMA, and PK deficiency, with DNA review.",
    pedigreeNote: "Certified 5-generation pedigree. TICA registered.",
  },
  {
    id: "jojo",
    name: "JoJo",
    short: "JoJo",
    tagline: "Bold Blue Torbie",
    role: "queen",
    sex: "Female",
    coat: "Blue Torbie Polydactyl",
    photo: IMAGES.placeholder_Jojo,
    gallery: [IMAGES.placeholder_Jojo],
    bio: "JoJo is a stunning Blue Torbie Polydactyl Maine Coon with a fierce, wild look and a personality to match! Her expressive eyes and bold markings give her a captivating presence that's impossible to ignore.",
    health: "Screened in program for HCM, SMA, and PK deficiency, with DNA review.",
    pedigreeNote: "Certified 5-generation pedigree. TICA registered.",
  },
  {
    id: "chimmy",
    name: "Chimmy",
    short: "Chimmy",
    tagline: "A Future Queen",
    role: "queen",
    sex: "Female",
    coat: "Tortie",
    photo: IMAGES.rectangle104,
    gallery: [IMAGES.rectangle104],
    bio: "Chimmy is a stunning Tortie Maine Coon with a bold, artistic coat and a confident, graceful demeanor. As a future Queen in our cattery, she promises to bring both beauty and strong maternal instincts to her litters.",
    health: "Growing up within the Copper Road program.",
    pedigreeNote: "Certified lineage. TICA registered.",
  },
];



export const kittens = [
  {
    id: "aurelius",
    name: "Aurelius",
    coat: "Red Classic Tabby",
    sex: "Male",
    status: "Available",
    dob: "July 18, 2026",
    price: "Price on request",
    parents: ["aria", "butter"],
    personality:
      "Aurelius is a breathtaking Red Classic Tabby male with huge paw tufts and a highly affectionate, vocal personality. He follows conversations around the room and settles in laps the moment they are offered.",
    photo: IMAGES.kittenImage,
    gallery: [IMAGES.kittenImage, IMAGES.kittenRedTabby, IMAGES.rectangle2],
  },
  {
    id: "seraphina",
    name: "Seraphina",
    coat: "Silver Tortoiseshell",
    sex: "Female",
    status: "Available",
    dob: "July 18, 2026",
    price: "Price on request",
    parents: ["olive", "roman"],
    personality:
      "A gorgeous Silver Tortoiseshell female who loves snuggling. She inherits her mom Olive's whimsical playful spirit, then finishes the afternoon tucked under a chin.",
    photo: IMAGES.kittenImage1,
    gallery: [IMAGES.kittenImage1, IMAGES.kittenSilver, IMAGES.rectangle5],
  },
  {
    id: "caspian",
    name: "Caspian",
    coat: "Black Smoke Polydactyl",
    sex: "Male",
    status: "Reserved",
    dob: "June 2, 2026",
    price: "Price on request",
    parents: ["kiki", "armani"],
    personality:
      "A solid Black Smoke Polydactyl male with a gorgeous coat that shines like silver in the sunlight. Calm and cuddly, with mitten paws and a quiet little chirp.",
    photo: IMAGES.kittenImage2,
    gallery: [IMAGES.kittenImage2, IMAGES.kittenBlackSmoke, IMAGES.rectangle4],
  },
  {
    id: "mirabelle",
    name: "Mirabelle",
    coat: "Blue Tabby",
    sex: "Female",
    status: "Available",
    dob: "August 9, 2026",
    price: "Price on request",
    parents: ["jojo", "royal"],
    personality:
      "This sweet Blue Tabby girl is extremely playful and loves chasing feathered toys. Raised with continuous family handling, she is bold, bright, and ready to be someone's shadow.",
    photo: IMAGES.kittenImage3,
    gallery: [IMAGES.kittenImage3, IMAGES.kittenBlueSmoke, IMAGES.rectangle3],
  },
  {
    id: "wren",
    name: "Wren",
    coat: "Calico",
    sex: "Female",
    status: "Sold",
    dob: "March 12, 2026",
    price: "Price on request",
    parents: ["olive", "roman"],
    personality:
      "Wren has already found her forever family. She remains here so you can see the kind of companion a Copper Road kitten grows into—bright, affectionate, and full of coat.",
    photo: IMAGES.kittenCalico,
    gallery: [IMAGES.kittenCalico, IMAGES.happyKittenInHands],
  },
];

export const galleryPhotos = [
  { src: IMAGES.rectangle16, alt: "Maine Coon resting at Copper Road" },
  { src: IMAGES.rectangle17, alt: "Close portrait of a Copper Road Maine Coon" },
  { src: IMAGES.rectangle18, alt: "Maine Coon in warm window light" },
  { src: IMAGES.rectangle151, alt: "Kitten moment at the cattery" },
  { src: IMAGES.rectangle161, alt: "Fluffy Maine Coon coat detail" },
  { src: IMAGES.rectangle171, alt: "Copper Road cat looking toward the camera" },
  { src: IMAGES.rectangle181, alt: "Quiet afternoon with a Maine Coon" },
  { src: IMAGES.playfulKittensGroupPhoto, alt: "Playful kittens together at Copper Road" },
  { src: IMAGES.img20230206_091346, alt: "Life at Copper Road, country morning" },
  { src: IMAGES.img20230809_103341Scaled, alt: "Maine Coon in the home cattery" },
  { src: IMAGES.kittenSleepingPortrait, alt: "Sleeping Maine Coon kitten portrait" },
  { src: IMAGES.southDakotaFarmScenery, alt: "South Dakota farm scenery near Copper Road" },
  { src: IMAGES.kittensPlaying, alt: "Maine Coon kittens playing with a feather toy" },
  { src: IMAGES.motherKittens, alt: "Mother Maine Coon with her kittens" },
  { src: IMAGES.catteryInterior, alt: "Cozy home cattery interior" },
  { src: IMAGES.familyKitten, alt: "Family holding a Maine Coon kitten" },
];



export const litters = [
  {
    id: "l1",
    queen: "aria",
    king: "butter",
    colors: "Red tabby, black smoke",
    birth: "July 2026",
    goHome: "October 2026",
    status: "Born",
  },
  {
    id: "l2",
    queen: "olive",
    king: "roman",
    colors: "Silver, calico, tortoiseshell",
    birth: "Late November 2026",
    goHome: "January 2027",
    status: "Expecting",
  },
  {
    id: "l3",
    queen: "kiki",
    king: "armani",
    colors: "Black smoke, polydactyl possible",
    birth: "Spring 2027",
    goHome: "Summer 2027",
    status: "Planned",
  },
  {
    id: "l4",
    queen: "jojo",
    king: "royal",
    colors: "Blue tabby, blue torbie",
    birth: "Spring 2026",
    goHome: "Placed",
    status: "Sold Out",
  },
];


const line = (pairs) => pairs.map(([name, note]) => ({ name, note }));

export const pedigrees = {
  royal: {
    gens: [
      [{ name: "Royal", note: "Blue Smoke Tabby" }],
      line([
        ["RUDI", "Foundation sire"],
        ["Dam of Royal", "Registered queen"],
      ]),
      line([
        ["Sire's sire", "5-gen line"],
        ["Sire's dam", "5-gen line"],
        ["Dam's sire", "5-gen line"],
        ["Dam's dam", "5-gen line"],
      ]),
      line([
        ["Gen 4", "TICA"],
        ["Gen 4", "TICA"],
        ["Gen 4", "TICA"],
        ["Gen 4", "TICA"],
      ]),
      line([
        ["Gen 5", "Foundation"],
        ["Gen 5", "Foundation"],
        ["Gen 5", "Foundation"],
        ["Gen 5", "Foundation"],
      ]),
    ],
  },
};

export function pedigreeFor(cat) {
  if (pedigrees[cat.id]) return pedigrees[cat.id];
  return {
    gens: [
      [{ name: cat.short, note: cat.coat }],
      line([
        [`Sire of ${cat.short}`, "Registered king"],
        [`Dam of ${cat.short}`, "Registered queen"],
      ]),
      line([
        ["Paternal grandsire", "5-generation line"],
        ["Paternal granddam", "5-generation line"],
        ["Maternal grandsire", "5-generation line"],
        ["Maternal granddam", "5-generation line"],
      ]),
      line([
        ["Gen 4 ancestor", "TICA"],
        ["Gen 4 ancestor", "TICA"],
        ["Gen 4 ancestor", "TICA"],
        ["Gen 4 ancestor", "TICA"],
      ]),
      line([
        ["Gen 5 ancestor", "Foundation"],
        ["Gen 5 ancestor", "Foundation"],
        ["Gen 5 ancestor", "Foundation"],
        ["Gen 5 ancestor", "Foundation"],
      ]),
    ],
  };
}

export const pillars = [
  {
    id: "health",
    title: "Health Testing",
    text: "Learn about the health testing and screening practices used within our program.",
    icon: "heart-pulse",
  },
  {
    id: "pedigrees",
    title: "Pedigrees",
    text: "Our Queens and Kings have certified 5-generation pedigrees.",
    icon: "scroll",
  },
  {
    id: "tica",
    title: "TICA Registered",
    text: "Our Maine Coons are proudly registered with The International Cat Association.",
    icon: "badge",
  },
  {
    id: "pairings",
    title: "Thoughtful Pairings",
    text: "Our breeding plan focuses on responsible pairings and the continued development of healthy, beautiful Maine Coons.",
    icon: "heart",
  },
];

export const faqs = [
  {
    q: "What makes Maine Coons different from other cats?",
    a: "Maine Coons are known as the “gentle giants” of the cat world. They are large, highly intelligent, affectionate, and incredibly social. They tend to form strong bonds with their families and often behave more like dogs than cats—following you around, greeting you at the door, and even playing fetch.",
  },
  {
    q: "How does the waitlist work?",
    a: "Fill out our inquiry form or message us directly. Tell us what you're looking for (gender, color, poly or not). Once approved, a non-refundable deposit secures your place. Availability varies. We typically work from a waiting list, but occasionally kittens become available.",
  },
  {
    q: "What about deposits and pricing?",
    a: "Our pricing reflects the exceptional care, health, and selective breeding that go into each kitten. Pet kittens typically start at $2,000. Pricing varies based on color, gender, structure, and overall show or breeding potential. A non-refundable deposit is required to reserve a kitten, and all pricing and terms are outlined before you commit. In this app, kitten cards show “Price on request” so we can talk through the right fit first.",
  },
  {
    q: "What health guarantee do kittens come with?",
    a: "All breeding parents are thoroughly DNA tested and screened for HCM, SMA, and PK Def. Kittens are vaccinated, dewormed, and health checked before they go home. We do not release kittens early; this is essential for their development and long-term health. We are committed to every kitten for life—if you can no longer keep them, they come back to us.",
  },
  {
    q: "Pickup or delivery?",
    a: "We prioritize safe, low-stress, in-person placement whenever possible. We offer local pickup, delivery within a reasonable distance, and meet-up options when available. At this time, we do not ship our kittens.",
  },
  {
    q: "Are kittens vaccinated and health checked?",
    a: "Yes. We prioritize health, temperament, and proper development above all. Spay or neuter for pet kittens must be completed between 6–8 months of age unless otherwise approved in writing. Declawing is not permitted.",
  },
  {
    q: "What temperament can I expect?",
    a: "We focus heavily on temperament. Kittens are raised underfoot, not in cages. They are handled daily and exposed to normal household life, making them well-socialized, confident companions.",
  },
  {
    q: "Are your cats registered?",
    a: "Yes. All of our breeding cats and kittens are registered through recognized cat registries (such as TICA and/or CFA) and come from lines with documented 5-generation pedigrees. Pet kittens are typically sold with limited registration. Full registration is only available to approved programs.",
  },
];


export const seedReviews = [
  {
    id: "r1",
    name: "Emily R.",
    location: "California",
    stars: 5,
    quote:
      "Bringing home our Maine Coon kitten from Copper Road was one of the best decisions we've ever made. From the very first message, they were so supportive and patient, answering every question with kindness. Our kitten arrived happy, healthy, and full of personality. It's clear how much love and care goes into their breeding. We feel like we not only gained a cat but joined a family.",
  },
  {
    id: "r2",
    name: "A Copper Road family",
    location: "South Dakota",
    stars: 5,
    quote:
      "Rudi was treated like a King. He will forever be missed. And I will forever be thankful for him, for one of the biggest blessings I could have ever asked for.",
  },
  {
    id: "r3",
    name: "Visitor",
    location: "Midwest",
    stars: 5,
    quote:
      "Y'all are doing it RIGHT!! I've been to several Maine Coon catteries, and I would love to visit yours some day. I just LOVE the way you raise your babies, and care so much for the Mommy's! Those have got to be the BEST kittens ever!!",
  },
  {
    id: "r4",
    name: "Future family",
    location: "United States",
    stars: 5,
    quote:
      "I can't wait to bring one of these little babies home! Your pictures make me smile every time I see them. Your love and dedication sure show!",
  },
  {
    id: "r5",
    name: "Family note",
    location: "Copper Road",
    stars: 5,
    quote:
      "You won't find better breeders than Tami Werning Krogman and Darin Krogman. Love Tami's kitties! She does an amazing job!",
  },
];

export const shopCategories = ["All", "Apparel", "Mugs & Drinkware", "Accessories"];


export const shopPerks = [
  { title: "USA Hand-Printed", text: "Decorated by master artisans in South Dakota." },
  { title: "Careful Shipping", text: "Eco-friendly packaging to ensure safe delivery." },
  { title: "Quality Guarantee", text: "Full size exchanges and returns within 30 days." },
  { title: "Supporting Wellness", text: "Proceeds support cattery genetic health testing." },
];

export const products = [
  {
    id: "the-classic-logo-tee",
    name: "The Classic Logo Tee",
    category: "Apparel",
    price: 28,
    featured: true,
    tag: "Best Seller",
    description:
      "100% premium heavy cotton tee featuring our iconic Copper Road hand-drawn paw emblem. Preshrunk, unisex cut, in copper clay color.",
    image: IMAGES.imageContainer,
  },
  {
    id: "cozy-cattery-hoodie",
    name: "Cozy Cattery Hoodie",
    category: "Apparel",
    price: 58,
    tag: "Cozy Pick",
    description:
      "Heavyweight warm pullover fleece, perfect for crisp South Dakota mornings. Gold embroidered ‘Copper Road Maine Coons’ arch style.",
    image: IMAGES.rectangle7,
  },
  {
    id: "heritage-ceramic-mug",
    name: "Heritage Ceramic Mug",
    category: "Mugs & Drinkware",
    price: 18,
    description:
      "Artisanal hand-dipped pottery mug. Stamped with TICA credentials & the Copper Road seal. Holds 14 oz of your favorite brew.",
    image: IMAGES.rectangle8,
  },
  {
    id: "standard-canvas-tote",
    name: "Standard Canvas Tote",
    category: "Accessories",
    price: 22,
    description:
      "Durable, thick organic cotton duck bag for daily trips. Deep inner pockets to hold brush gear, toys, or daily groceries.",
    image: IMAGES.rectangle91,
  },
  {
    id: "embroidered-paw-cap",
    name: "Embroidered Paw Cap",
    category: "Accessories",
    price: 24,
    description:
      "Unstructured pigment-dyed adjustable cap. Features an intricate gold and navy paw stitch. Built to fade beautifully.",
    image: IMAGES.imageContainer1,
  },
  {
    id: "cattery-sticker-pack",
    name: "Cattery Sticker Pack",
    category: "Accessories",
    price: 10,
    description:
      "A set of five durable waterproof die-cut vinyl stickers. Hand-sketched cat faces, paw badges, and TICA stamp illustrations.",
    image: IMAGES.imageContainer2,
  },
];



const SAMPLE = "Education copy is sample content and must be reviewed and approved by the client before launch.";

export const articles = [
  {
    id: "meet",
    category: "Meet The Maine Coon",
    title: "Meet The Maine Coon",
    minutes: 6,
    image: IMAGES.rectangle6,
    alt: "Majestic Maine Coon portrait",
    blocks: [
      { type: "note", text: SAMPLE },
      { type: "h", text: "A gentle giant with a long story" },
      { type: "p", text: "Maine Coons grew up as working farm cats of the Northeast, prized for sturdy bone, weatherproof coats, and an easy friendship with people. At Copper Road, that history shows up as cats who want to be in the room with you." },
      { type: "h", text: "Size and growth" },
      { type: "p", text: "These kittens look finished long before they are. Most Maine Coons take 3 to 5 years to reach full maturity. Expect a lanky teenager before you meet the adult cat." },
      { type: "ul", items: ["12 weeks: ready for a family, still very much a kitten", "6–12 months: rapid growth, big paws, bigger opinions", "3–5 years: full coat, bone, and presence"] },
      { type: "h", text: "Coat, color, and polydactyl paws" },
      { type: "p", text: "Coats are long, silky, and slightly water-resistant, with a ruff, ear tufts, and a plume of a tail. Our program includes black smoke, silver shaded, blue smoke tabby, red tabby, and calico. Several of our cats are polydactyl—the famous mitten paws." },
      { type: "h", text: "Temperament and lifespan" },
      { type: "p", text: "They are gentle, social, and often dog-like: they greet you, follow you, and talk. With routine veterinary care, many live well into their teens. Lifespan is individual; wellness visits are what protect it." },
    ],
  },
  {
    id: "home",
    category: "Preparing Your Home",
    title: "Preparing Your Home",
    minutes: 5,
    image: IMAGES.catteryInterior,
    alt: "Cozy home ready for a kitten",
    blocks: [
      { type: "note", text: SAMPLE },
      { type: "h", text: "Kitten-proofing checklist" },
      { type: "ul", items: ["Secure cords, hair ties, and plastic bags", "Close the dryer and washer before every cycle", "Put away lilies, essential oils, and string", "Check window screens and balcony gaps", "Offer a tall scratching post on day one"] },
      { type: "h", text: "A safe room" },
      { type: "p", text: "Start in one quiet room with a bed, water, food, a litter box away from the food, and a place to hide. Let the kitten choose when the rest of the house opens up." },
      { type: "h", text: "Litter, posts, and toys" },
      { type: "p", text: "Place the litter box somewhere easy to reach and easy for you to scoop. A sisal post beside the sofa saves the sofa. Wand toys beat fingers—Maine Coons play with their whole body." },
    ],
  },
  {
    id: "feeding",
    category: "Feeding & Nutrition",
    title: "Feeding & Nutrition",
    minutes: 7,
    image: IMAGES.catProducts,
    alt: "Cat feeding bowls and care items",
    blocks: [
      { type: "note", text: SAMPLE },
      { type: "h", text: "Kitten food, then adult food" },
      { type: "p", text: "Kittens need a complete diet labeled for growth until they are about 12 months, sometimes longer for this slow-maturing breed. Ask your veterinarian before switching to adult food." },
      { type: "h", text: "A simple rhythm" },
      { type: "ul", items: ["8–16 weeks: 4 small meals", "4–6 months: 3 meals", "6–12 months: 2–3 meals", "Adults: 2 measured meals, fresh water always"] },
      { type: "h", text: "Foods to avoid" },
      { type: "ul", items: ["Onion, garlic, chives", "Grapes and raisins", "Chocolate, caffeine, alcohol", "Xylitol, raw dough, cooked bones", "Dog food as a regular diet"] },
      { type: "p", text: "Treats should stay a small part of the day. A puzzle feeder does more for a Maine Coon brain than a crowded bowl." },
    ],
  },
  {
    id: "health",
    category: "Health & Vet Care",
    title: "Health & Vet Care",
    minutes: 8,
    image: IMAGES.vetCare,
    alt: "Veterinarian examining a Maine Coon kitten",
    blocks: [
      { type: "note", text: SAMPLE },
      { type: "h", text: "Vaccines and deworming" },
      { type: "p", text: "Your kitten comes with records of the care already given. Your veterinarian will schedule the remaining kitten series, deworming, and later rabies vaccination according to local guidance." },
      { type: "h", text: "Spay and neuter" },
      { type: "p", text: "Pet kittens are altered between 6 and 8 months unless we approve another plan in writing. Registration paperwork for pet kittens is released after proof of spay or neuter." },
      { type: "h", text: "Screening we practice" },
      { type: "p", text: "All breeding parents are DNA tested and screened for HCM, SMA, and PK deficiency. We also pay attention to hearts, hips, and the overall structure of the breed. This is not a promise that any cat will be free of every condition; it is how we choose pairings." },
      { type: "h", text: "Call the veterinarian" },
      { type: "ul", items: ["Not eating for more than a day, or no urine", "Labored breathing, open-mouth breathing, or collapse", "Repeated vomiting, straining, or lethargy", "A male cat visiting the box without producing urine — same-day emergency"] },
    ],
  },
  {
    id: "grooming",
    category: "Grooming",
    title: "Grooming A Long Coat",
    minutes: 5,
    image: IMAGES.grooming,
    alt: "Brushing a long-haired Maine Coon",
    blocks: [
      { type: "note", text: SAMPLE },
      { type: "h", text: "Brushing" },
      { type: "p", text: "A few calm minutes several times a week prevents mats behind the ears, under the arms, and along the britches. Use a metal comb down to the skin, then a soft brush over the topcoat." },
      { type: "h", text: "Nails, ears, teeth" },
      { type: "ul", items: ["Trim the tips of the nails every few weeks", "Check ears for wax; never push a swab into the canal", "Start tooth brushing early with feline toothpaste", "Baths are occasional. A damp cloth handles most days"] },
      { type: "p", text: "Declawing is not part of life with a Copper Road cat. Scratching posts are." },
    ],
  },
  {
    id: "training",
    category: "Training & Socialization",
    title: "Training & Socialization",
    minutes: 6,
    image: IMAGES.kittensPlaying,
    alt: "Kittens playing and learning",
    blocks: [
      { type: "note", text: SAMPLE },
      { type: "h", text: "Litter and handling" },
      { type: "p", text: "Our kittens already use a litter box. Keep it scooped, skip scented litter at first, and praise the quiet successes. Handle paws, ears, and mouth a little every day so grooming stays easy." },
      { type: "h", text: "Kids and other pets" },
      { type: "p", text: "Introduce children as calm laps, not as a parade. Other pets meet through a door, then a gate, then a shared room. Go backward if anyone hisses or freezes." },
      { type: "h", text: "Play" },
      { type: "p", text: "Two short wand sessions a day teach bite inhibition and spend the energy of a cat who will be large. End with a meal so the hunt has a finish." },
    ],
  },
  {
    id: "gomeday",
    category: "Bringing Your Kitten Home",
    title: "Bringing Your Kitten Home",
    minutes: 6,
    image: IMAGES.familyKitten,
    alt: "Family welcoming a Maine Coon kitten",
    blocks: [
      { type: "note", text: SAMPLE },
      { type: "h", text: "Go-home day" },
      { type: "ul", items: ["Carrier lined with a familiar blanket", "The food they are already eating", "Litter similar to what they know", "A quiet first room, not a party", "Our phone number saved"] },
      { type: "h", text: "The first 48 hours" },
      { type: "p", text: "Expect hiding, huge naps, and a cautious appetite. Sit on the floor and let the kitten do the approaching. Limit visitors." },
      { type: "h", text: "Travel" },
      { type: "p", text: "We do not ship kittens. Pickup, a reasonable delivery, or a meet-up keeps the day low-stress. The carrier stays covered and level." },
      { type: "h", text: "What comes with your kitten" },
      { type: "ul", items: ["Health records", "Pedigree information", "TICA registration paperwork, released per your contract", "A written go-home note from us"] },
    ],
  },
  {
    id: "pedigree",
    category: "Pedigrees & TICA",
    title: "Understanding Pedigrees & TICA",
    minutes: 5,
    image: IMAGES.group,
    alt: "Health and pedigree icon from Copper Road",
    blocks: [
      { type: "note", text: SAMPLE },
      { type: "p", text: "A pedigree is a family tree. Ours are certified five generations deep so we can see color, type, and the health history we plan around." },
      { type: "h", text: "TICA" },
      { type: "p", text: "Our Maine Coons are proudly registered with The International Cat Association. Registration is how a purebred cat's identity is recorded. It is not the same thing as a show title." },
      { type: "h", text: "Limited and full registration" },
      { type: "p", text: "Pet kittens are typically sold with limited registration, which means they are companions, not breeding cats. Full registration is offered only to programs we approve in writing. Paperwork for pet kittens follows proof of spay or neuter." },
    ],
  },
];

export const articleCategories = ["All", ...Array.from(new Set(articles.map((a) => a.category)))];

export const checklist = [
  "Carrier and a familiar-smelling blanket",
  "Kitten food matching what we send home",
  "Shallow water bowl or a quiet fountain",
  "Unscented litter and a low-sided box",
  "Scratching post and a hide",
  "Wand toy and a couple of quiet toys",
  "Veterinarian appointment on the calendar",
  "Our contact saved in your phone",
];

export const feedingRows = [
  { age: "8–12 weeks", meals: "4", notes: "Growth formula, small portions" },
  { age: "3–6 months", meals: "3", notes: "Still growing fast" },
  { age: "6–12 months", meals: "2–3", notes: "Measure, don't free-pour" },
  { age: "1–5 years", meals: "2", notes: "Ask your vet when to leave kitten food" },
  { age: "Adult", meals: "2", notes: "Fresh water all day" },
];

export const videos = [
  { id: "v1", title: "First brush, first week", length: "4 min", image: IMAGES.grooming, alt: "Grooming tutorial still" },
  { id: "v2", title: "Setting up the safe room", length: "3 min", image: IMAGES.catteryInterior, alt: "Home setup tutorial still" },
  { id: "v3", title: "Meeting the resident pet", length: "5 min", image: IMAGES.kittensPlaying, alt: "Socialization tutorial still" },
];

export const trustBadges = ["TICA Registered", "5-Generation Pedigrees", "Health Tested", "Raised With Love"];

export const hearAbout = ["Instagram", "Facebook", "Friend/Family", "Google", "Other"];

export const demoUser = {
  firstName: "Jordan",
  lastName: "Hale",
  email: "jordan@example.com",
  phone: "(605) 555-0148",
  password: "Copper1",
  city: "Sioux Falls",
  state: "SD",
  zip: "57104",
};

export function catById(id) {
  return cats.find((c) => c.id === id);
}

export function kittenById(id) {
  return kittens.find((k) => k.id === id);
}

export function productById(id) {
  return products.find((p) => p.id === id);
}

export function kittensOf(catId) {
  return kittens.filter((k) => k.parents.includes(catId));
}

export function money(n) {
  return `$${n.toFixed(2)}`;
}
