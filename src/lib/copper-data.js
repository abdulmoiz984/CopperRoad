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



/**
 * The cattery roster, taken from the client's "Where Our Babies Begin"
 * document. `role` drives the segment a cat appears under on the Cats tab;
 * `status` is the label the client uses for that cat in their own copy.
 */
export const cats = [
  /* ---------------------------------------------------------------- kings */
  {
    id: "royal",
    name: "Royal",
    short: "Royal",
    tagline: "Son Of Rudi",
    role: "king",
    status: "Sire",
    sex: "Male",
    coat: "Blue Silver Tabby",
    lineage: "Son of Rudi",
    photo: IMAGES.catRoyal,
    gallery: [IMAGES.catRoyal, IMAGES.rectangle106, IMAGES.kittenBlueSmoke],
    bio: "Royal is a stunning Blue Silver Tabby and the son of our beloved Rudi. He has inherited not only his father's striking good looks but also his wonderful temperament. Royal is affectionate, gentle, and enjoys being around people, making him a favorite among family and visitors alike.\n\nAs an important part of our breeding program, Royal consistently produces beautiful, expressive kittens with exceptional type, gorgeous coats, and sweet personalities. We are excited to watch his legacy continue through future generations at Copper Road Maine Coons.",
    quote:
      "With his handsome appearance, loving nature, and outstanding offspring, Royal carries on the legacy of his father while creating one of his own.",
    health: "Health screened and DNA tested as part of our breeding program.",
    pedigreeNote: "Documented 5-generation pedigree. Son of RUDI. Registered with TICA and CFF.",
  },
  {
    id: "roman",
    name: "Roman",
    short: "Roman",
    tagline: "Our Handsome Boy From Moldova",
    role: "king",
    status: "Sire",
    sex: "Male",
    coat: "High Silver Shaded",
    origin: "Moldova",
    photo: IMAGES.catRoman,
    gallery: [IMAGES.catRoman, IMAGES.placeholder_Roman, IMAGES.placeholder_Roman1, IMAGES.placeholder_Roman2],
    bio: "Roman is our handsome boy from Moldova. He is a breathtaking High Silver Shaded Maine Coon with exceptional coloring, type, and presence. His stunning silver coat, expressive features, and impressive size make him a standout wherever he goes. In addition to his remarkable appearance, Roman has a sweet and loving personality that perfectly complements his regal look.\n\nAs an important part of our breeding program, we are excited to see the beautiful qualities he passes on to his kittens. Roman consistently captures attention with his elegance, charm, and unmistakable Maine Coon characteristics.",
    quote:
      "With his dazzling silver coat and striking expression, Roman embodies the beauty, elegance, and grandeur of the Maine Coon breed.",
    health: "Health screened and DNA tested as part of our breeding program.",
    pedigreeNote: "Documented 5-generation pedigree. Registered with TICA and CFF.",
  },
  {
    id: "armani",
    name: "Armani",
    short: "Armani",
    tagline: "Gentle, Quiet, And Affectionate",
    role: "king",
    status: "Stud Male",
    sex: "Male",
    coat: "Black Smoke",
    personality: "Gentle, Quiet, and Affectionate",
    photo: IMAGES.catArmani,
    gallery: [IMAGES.catArmani, IMAGES.rectangle11, IMAGES.kittenBlackSmoke],
    bio: "Armani is a magnificent Black Smoke Maine Coon. While he doesn't live with us full-time, he remains an important part of our breeding program and occasionally visits for special date nights with our girls. Known for his impressive size, gentle nature, and stunning smoky coat, Armani has a calm and affectionate personality that makes him a favorite among visitors. We are grateful to have him as part of the Copper Road family and look forward to the beautiful kittens he helps bring into the world.",
    quote:
      "With his majestic presence and sweet temperament, Armani embodies the beauty and charm of the Maine Coon breed.",
    health: "Health screened and DNA tested as part of our breeding program.",
    pedigreeNote: "Documented 5-generation pedigree. Registered with TICA and CFF.",
  },
  {
    id: "atlas",
    name: "Atlas",
    short: "Atlas",
    tagline: "One Of A Kind, Odd-Eyed",
    role: "king",
    status: "Future Sire",
    sex: "Male",
    coat: "Black Silver Tabby",
    eyes: "Odd-Eyed (one blue eye and one green eye)",
    photo: IMAGES.catAtlas,
    gallery: [IMAGES.catAtlas],
    bio: "Atlas is one of our future sires. He is a gorgeous Black Silver Tabby with two different colored eyes, making him truly one of a kind. His unique appearance, impressive size, and sweet temperament make him an exciting addition to our breeding program. We look forward to watching him mature and can't wait to see the beautiful kittens he will produce in the future.",
    quote:
      "With his striking silver coat and captivating eyes, Atlas is sure to leave a lasting impression wherever he goes.",
    health: "Growing up within the Copper Road program; health screening and DNA testing ahead of his first season.",
    pedigreeNote: "Documented 5-generation pedigree. Registered with TICA and CFF.",
  },

  /* --------------------------------------------------------------- queens */
  {
    id: "olive",
    name: "Olive",
    short: "Olive",
    tagline: "Our Calico Polydactyl Queen",
    role: "queen",
    status: "Queen",
    sex: "Female",
    coat: "Calico Polydactyl",
    litterStatus: "Four kittens, born and thriving",
    photo: IMAGES.catOlive,
    gallery: [IMAGES.catOlive, IMAGES.placeholder_Olive, IMAGES.kittenCalico],
    bio: "Olive is our beautiful Calico Polydactyl queen. She recently welcomed four beautiful kittens and is proving once again what a wonderful mom she is.\n\nOlive's unique polydactyl paws, stunning calico coloring, and affectionate personality make her a favorite among our Copper Road family. She is a loving mother with a calm and nurturing nature, and her kittens are already thriving under her care.",
    health: "Health screened and DNA tested as part of our breeding program.",
    pedigreeNote: "Documented 5-generation pedigree. Registered with TICA and CFF.",
  },
  {
    id: "kiki",
    name: 'Niagara "KiKi"',
    short: "KiKi",
    tagline: "Our Black Smoke Girl From Moscow",
    role: "queen",
    status: "Queen",
    sex: "Female",
    coat: "Black Smoke Polydactyl",
    origin: "Moscow, Russia",
    litterStatus: "Four kittens, born and thriving",
    photo: IMAGES.catKiki,
    gallery: [IMAGES.catKiki, IMAGES.kiki, IMAGES.kittenBlackSmoke],
    bio: "KiKi came to us from Moscow and is a stunning Black Smoke Polydactyl Maine Coon. She recently welcomed four beautiful kittens and is doing an amazing job raising her babies.\n\nWith her large polydactyl paws, striking black smoke coat, and sweet personality, KiKi is truly a remarkable girl. She is a devoted and attentive mother who gives her kittens the very best care from the moment they are born.",
    health: "Health screened and DNA tested as part of our breeding program.",
    pedigreeNote: "Documented 5-generation pedigree. Registered with TICA and CFF.",
  },
  {
    id: "jojo",
    name: 'Joliet "JoJo"',
    short: "JoJo",
    tagline: "The Classic Wild Maine Coon Look",
    role: "queen",
    status: "Queen",
    sex: "Female",
    coat: "Blue Tortie Polydactyl",
    origin: "Parents from Russia",
    litterStatus: "Recently paired with Roman",
    photo: IMAGES.catJojo,
    gallery: [IMAGES.catJojo, IMAGES.placeholder_Jojo],
    bio: "JoJo's parents are both from Russia, and she is a gorgeous Blue Tortie Polydactyl Maine Coon. With her tufted ears, strong features, and captivating expression, she has the classic wild Maine Coon look that so many people love.\n\nJoJo recently had a date with Roman, and if all goes as planned, we should know within the next month if kittens are on the way.",
    health: "Health screened and DNA tested as part of our breeding program.",
    pedigreeNote: "Documented 5-generation pedigree. Registered with TICA and CFF.",
  },
  {
    id: "aria",
    name: "Aria",
    short: "Aria",
    tagline: "One Of Our Largest Girls",
    role: "queen",
    status: "Queen",
    sex: "Female",
    coat: "Black Smoke",
    origin: "Russia",
    litterStatus: "Expecting — paired with Royal",
    photo: IMAGES.catAria,
    gallery: [IMAGES.catAria, IMAGES.rectangle10, IMAGES.kittenBlackSmoke],
    bio: "Aria is another beautiful girl from Russia. She is a striking Black Smoke Maine Coon with an impressive size and a gentle, loving personality. As one of the largest females in our cattery, Aria is truly a showstopper.\n\nDespite her size, Aria is one of the sweetest girls we have. She loves attention, enjoys being around her people, and has a calm, affectionate nature that makes her a favorite among visitors. Aria recently had a date with Royal, and we are eagerly awaiting the pitter-patter of little paws any day now!",
    health: "Health screened and DNA tested as part of our breeding program.",
    pedigreeNote: "Documented 5-generation pedigree. Registered with TICA and CFF.",
  },
  {
    id: "chimera",
    name: 'Chimera "Squeaks"',
    short: "Squeaks",
    tagline: "The Split-Face Beauty",
    role: "queen",
    status: "Queen",
    sex: "Female",
    coat: "Split-Face Tortie",
    litterStatus: "Expecting in the next couple of weeks",
    photo: IMAGES.catSqueaks,
    gallery: [IMAGES.catSqueaks, IMAGES.rectangle103, IMAGES.motherKittens],
    bio: "Squeaks is one of the most unique girls in our cattery. She is a gorgeous Split-Face Tortie Maine Coon with a striking half-and-half face and chest, giving her a truly unforgettable look.\n\nIn addition to her stunning appearance, Squeaks has a sweet personality and is a cherished member of our Copper Road family. If everything continues as expected, she should be welcoming kittens in the next couple of weeks.",
    health: "Health screened and DNA tested as part of our breeding program.",
    pedigreeNote: "Documented 5-generation pedigree. Registered with TICA and CFF.",
  },
  {
    id: "essmay",
    name: 'Essmay "Esse"',
    short: "Esse",
    tagline: "Mesmerizing Odd Eyes",
    role: "queen",
    status: "Future Queen",
    sex: "Female",
    coat: "Black Smoke",
    eyes: "Odd-Eyed (one brilliant blue and one radiant gold)",
    photo: IMAGES.catEssmay,
    gallery: [IMAGES.catEssmay],
    bio: "Essmay, lovingly known as “Esse,” is one of the future queens of Copper Road Maine Coons. This striking Black Smoke beauty captures everyone's attention with her mesmerizing odd eyes, one brilliant blue and one radiant gold. Her unique coloring and elegant appearance make her truly one of a kind.\n\nBeyond her stunning looks, Esse has a sweet and affectionate personality. She enjoys spending time with her family and carries herself with the confidence and grace that Maine Coons are known for. As a future queen, Esse represents the qualities we value most at Copper Road: exceptional temperament, striking beauty, and strong genetics.",
    health: "Growing up within the Copper Road program; health screening and DNA testing ahead of her first season.",
    pedigreeNote: "Documented 5-generation pedigree. Registered with TICA and CFF.",
  },

  /* ------------------------------------------- retiring, looking for homes */
  {
    id: "iris",
    name: "Iris",
    short: "Iris",
    tagline: "Looking For Her Forever Home",
    role: "retiring",
    status: "Retiring Queen",
    sex: "Female",
    coat: "Red Torbie",
    birthday: "August 3",
    photo: IMAGES.catIris,
    gallery: [IMAGES.catIris, IMAGES.placeholder_Iris],
    bio: "Iris is a beautiful Red Torbie Maine Coon who celebrated her 5th birthday on August 3rd. She will be having one final litter before retiring from our breeding program.\n\nAfter her babies are raised, Iris will be spayed, fully vaccinated, and ready to begin the next chapter of her life as a beloved companion. She has been a wonderful mother and an important part of our Copper Road family. If you are interested in giving Iris the pampered retirement she deserves, please contact us for more information.",
    health: "Will be spayed and fully vaccinated before she goes to her retirement home.",
    pedigreeNote: "Documented 5-generation pedigree. Registered with TICA and CFF.",
  },
  {
    id: "poppy",
    name: "Poppy",
    short: "Poppy",
    tagline: "Iris's Sister, Mittened And Sweet",
    role: "retiring",
    status: "Retiring Queen",
    sex: "Female",
    coat: "Torbie Polydactyl",
    birthday: "August 3",
    photo: IMAGES.catPoppy,
    gallery: [IMAGES.catPoppy, IMAGES.placeholder_Poppy],
    bio: "Poppy is a beautiful Torbie Polydactyl Maine Coon who celebrated her 5th birthday on August 3rd. She is Iris's sister and has been a cherished part of our Copper Road family.\n\nPoppy will be having one final litter before retiring from our breeding program. After her babies are raised, she will be spayed, fully vaccinated, and ready to enjoy a life of love, comfort, and plenty of pampering. If you are interested in giving Poppy the loving retirement home she deserves, please contact us for more information.",
    health: "Will be spayed and fully vaccinated before she goes to her retirement home.",
    pedigreeNote: "Documented 5-generation pedigree. Registered with TICA and CFF.",
  },

  /* ---------------------------------------------------- family & memorial */
  {
    id: "london",
    name: "London",
    short: "London",
    tagline: "The Heart And Soul Of The Nursery",
    role: "family",
    status: "Nursery Nanny",
    sex: "Female",
    coat: "Maine Coon",
    photo: IMAGES.placeholder_London1,
    gallery: [IMAGES.placeholder_London1, IMAGES.placeholder_London2, IMAGES.playfulKittensGroupPhoto],
    bio: "London is the heart and soul of Copper Road's nursery. With her gentle spirit and nurturing instincts, she has become the official welcome wagon—greeting new arrivals with warmth and curiosity—and the beloved nanny to every litter born in the cattery. Though she cannot have kittens of her own, London's maternal nature shines through in every cuddle, every watchful gaze, and every soft purr she offers to the babies.",
    health: "Loved and cared for as a member of the family.",
    pedigreeNote: "Forever part of our family. Not a breeding cat.",
  },
  {
    id: "rudi",
    name: "RUDI",
    short: "RUDI",
    tagline: "The Heart Of Copper Road",
    role: "memorial",
    status: "In Loving Memory",
    sex: "Male",
    coat: "Maine Coon",
    photo: IMAGES.rudiTheFoundingMaineCoon,
    gallery: [IMAGES.rudiTheFoundingMaineCoon, IMAGES.placeholder_Rudi1, IMAGES.placeholder_Rudi11, IMAGES.placeholder_Rudi12],
    bio: "Forever in our hearts, RUDI was more than just a cat—he was the soul of our cattery and the beginning of everything we've built at Copper Road. With his wisdom, strength, and gentle spirit, RUDI laid the foundation for generations of beautiful Maine Coons. His presence brought comfort, joy, and a sense of purpose to everyone who met him. We miss you, RUDI. You will always be the heart of Copper Road. “Some souls leave paw prints on our hearts forever.”",
    health: "In loving memory.",
    pedigreeNote: "Founding cat of Copper Road. Sire of Royal.",
  },
];

/** The segments the Cats tab offers, and the roles each one collects. */
export const catSegments = [
  { key: "Kittens", roles: [] },
  { key: "Queens", roles: ["queen"] },
  { key: "Kings", roles: ["king"] },
  { key: "Retiring", roles: ["retiring"] },
  { key: "Family", roles: ["family", "memorial"] },
];

export function catsInSegment(key) {
  const segment = catSegments.find((s) => s.key === key);
  if (!segment) return [];
  return cats.filter((c) => segment.roles.includes(c.role));
}

/**
 * Current kitten listings. Olive and KiKi each raised a litter of four;
 * names and individual photographs are still to come from the cattery, so
 * these cards carry the litter, coat, and status the client has confirmed.
 */
export const kittens = [
  {
    id: "olive-1",
    name: "Olive's Kitten 1",
    coat: "Calico",
    sex: "Female",
    status: "Available",
    dob: "October 2026",
    price: "$2,300",
    parents: ["olive"],
    personality:
      "One of Olive's four kittens, raised underfoot in our home and already thriving under her calm, nurturing care. Polydactyl paws are a possibility in this litter.",
    photo: IMAGES.kittenCalico,
    gallery: [IMAGES.kittenCalico, IMAGES.catOlive, IMAGES.rectangle2],
  },
  {
    id: "olive-2",
    name: "Olive's Kitten 2",
    coat: "Tortoiseshell",
    sex: "Female",
    status: "Available",
    dob: "October 2026",
    price: "$2,300",
    parents: ["olive"],
    personality:
      "A sweet, confident girl from Olive's litter. Handled daily and growing up with normal household life, noise, and visitors.",
    photo: IMAGES.kittenImage1,
    gallery: [IMAGES.kittenImage1, IMAGES.catOlive, IMAGES.rectangle5],
  },
  {
    id: "olive-3",
    name: "Olive's Kitten 3",
    coat: "Red Classic Tabby",
    sex: "Male",
    status: "Reserved",
    dob: "October 2026",
    price: "$2,300",
    parents: ["olive"],
    personality:
      "A bold, affectionate boy with big paw tufts who follows conversations around the room and settles into laps the moment they are offered.",
    photo: IMAGES.kittenImage,
    gallery: [IMAGES.kittenImage, IMAGES.kittenRedTabby],
  },
  {
    id: "olive-4",
    name: "Olive's Kitten 4",
    coat: "Calico Polydactyl",
    sex: "Female",
    status: "Reserved",
    dob: "October 2026",
    price: "Specialty — price on request",
    parents: ["olive"],
    personality:
      "A polydactyl girl with her mother's mitten paws and vibrant patches of color. Specialty kittens are priced individually.",
    photo: IMAGES.happyKittenInHands,
    gallery: [IMAGES.happyKittenInHands, IMAGES.catOlive],
  },
  {
    id: "kiki-1",
    name: "KiKi's Kitten 1",
    coat: "Black Smoke Polydactyl",
    sex: "Male",
    status: "Available",
    dob: "October 2026",
    price: "Specialty — price on request",
    parents: ["kiki"],
    personality:
      "A solid Black Smoke Polydactyl boy with a coat that shines like silver in the sunlight. Calm and cuddly, with mitten paws and a quiet little chirp.",
    photo: IMAGES.kittenImage2,
    gallery: [IMAGES.kittenImage2, IMAGES.kittenBlackSmoke, IMAGES.catKiki],
  },
  {
    id: "kiki-2",
    name: "KiKi's Kitten 2",
    coat: "Black Smoke",
    sex: "Female",
    status: "Available",
    dob: "October 2026",
    price: "$2,300",
    parents: ["kiki"],
    personality:
      "A striking smoke girl from KiKi's litter. Like her mother, she is turning out to be a talker who always has something to say.",
    photo: IMAGES.kittenBlackSmoke,
    gallery: [IMAGES.kittenBlackSmoke, IMAGES.catKiki],
  },
  {
    id: "kiki-3",
    name: "KiKi's Kitten 3",
    coat: "Blue Smoke",
    sex: "Female",
    status: "Reserved",
    dob: "October 2026",
    price: "$2,300",
    parents: ["kiki"],
    personality:
      "Extremely playful and quick to chase a feathered toy. Raised with continuous family handling, she is bold, bright, and ready to be someone's shadow.",
    photo: IMAGES.kittenImage3,
    gallery: [IMAGES.kittenImage3, IMAGES.kittenBlueSmoke],
  },
  {
    id: "kiki-4",
    name: "KiKi's Kitten 4",
    coat: "Silver",
    sex: "Male",
    status: "Sold",
    dob: "October 2026",
    price: "$2,300",
    parents: ["kiki"],
    personality:
      "Already spoken for by a family on our waiting list. He stays here so you can see the kind of companion a Copper Road kitten grows into.",
    photo: IMAGES.kittenSilver,
    gallery: [IMAGES.kittenSilver, IMAGES.catKiki],
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



/**
 * Current and upcoming litters, as described in "Where Our Babies Begin".
 * `king` is omitted where the cattery has not published the sire.
 */
export const litters = [
  {
    id: "l-olive",
    queen: "olive",
    colors: "Calico, tortoiseshell, polydactyl possible",
    birth: "October 2026",
    goHome: "December 2026 – January 2027",
    status: "Born",
    note: "Four kittens, already thriving under Olive's care.",
  },
  {
    id: "l-kiki",
    queen: "kiki",
    colors: "Black smoke, polydactyl possible",
    birth: "October 2026",
    goHome: "December 2026 – January 2027",
    status: "Born",
    note: "Four kittens, raised by a devoted and attentive mother.",
  },
  {
    id: "l-aria",
    queen: "aria",
    king: "royal",
    colors: "Black smoke, blue silver tabby",
    birth: "Any day now",
    goHome: "Roughly 9–12 weeks after birth",
    status: "Expecting",
    note: "We are eagerly awaiting the pitter-patter of little paws.",
  },
  {
    id: "l-squeaks",
    queen: "chimera",
    colors: "Tortie, split-face possible",
    birth: "Within the next couple of weeks",
    goHome: "Roughly 9–12 weeks after birth",
    status: "Expecting",
    note: "If everything continues as expected, Squeaks is due very soon.",
  },
  {
    id: "l-jojo",
    queen: "jojo",
    king: "roman",
    colors: "Blue tortie, high silver shaded, polydactyl possible",
    birth: "To be confirmed",
    goHome: "To be confirmed",
    status: "Planned",
    note: "JoJo recently had a date with Roman. We should know within the month if kittens are on the way.",
  },
  {
    id: "l-iris",
    queen: "iris",
    colors: "Red torbie",
    birth: "To be confirmed",
    goHome: "To be confirmed",
    status: "Planned",
    note: "One final litter before Iris retires and looks for her forever home.",
  },
  {
    id: "l-poppy",
    queen: "poppy",
    colors: "Torbie, polydactyl possible",
    birth: "To be confirmed",
    goHome: "To be confirmed",
    status: "Planned",
    note: "One final litter before Poppy retires and looks for her forever home.",
  },
];

/** The waiting-list terms the cattery gives prospective families. */
export const waitingList = {
  families: 36,
  deposit: "$300",
  typicalPrice: "$2,300",
  points: [
    "We currently have a waiting list of approximately 36 individuals and families.",
    "A $300 deposit reserves your place and is applied toward the purchase price of your kitten, which is typically $2,300. Specialty kittens may be priced differently.",
    "The remaining balance is due when you pick up your kitten.",
    "When it is your turn to choose, we contact you and send photos of the available kittens.",
    "If the color, gender, or specific kitten you are hoping for is not available, you are welcome to remain on the list for a future litter.",
    "Because families may pass and wait for a future litter, kitten selections are based solely on the date the deposit is received.",
    "Breeding plans and litter availability can change. We keep our waiting list updated as information becomes available.",
  ],
};

/** What every kitten leaves Copper Road with. */
export const goingHome = {
  age: "Between 9 and 12 weeks of age",
  includes: ["First set of vaccinations", "Multiple deworming treatments", "Complete health examination"],
  alterNote:
    "We do not spay or neuter our kittens before they leave for their new homes. Maine Coons are a slow-maturing breed, and we prefer to allow them additional time to grow and develop before altering. We generally recommend discussing timing with your veterinarian, and suggest spaying or neutering between 6 and 8 months of age.",
};

/** How the cattery likes to get to know a prospective family. */
export const gettingToKnowYou = {
  intro:
    "We believe the best way to find the right home for our kittens and retired adults is by getting to know each other personally. Share a little about yourself, your family, where you live, any pets you currently have, and anything else you would like us to know.",
  channels: ["Text", "Email", "Phone call", "Video call", "Facebook Messenger call"],
};

/** Visiting the cattery. */
export const visitInfo = {
  location: "Just 11 miles east of Mitchell, South Dakota.",
  appointment:
    "Visits are welcome by appointment only. Please contact us in advance to schedule a time so we can make sure we are available and give you the attention you deserve.",
  signature: "Tami & Darin Krogman, Copper Road Maine Coons",
};


const line = (pairs) => pairs.map(([name, note]) => ({ name, note }));

export const pedigrees = {
  royal: {
    gens: [
      [{ name: "Royal", note: "Blue Silver Tabby" }],
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
        ["Gen 4", "TICA / CFF"],
        ["Gen 4", "TICA / CFF"],
        ["Gen 4", "TICA / CFF"],
        ["Gen 4", "TICA / CFF"],
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
        ["Gen 4 ancestor", "TICA / CFF"],
        ["Gen 4 ancestor", "TICA / CFF"],
        ["Gen 4 ancestor", "TICA / CFF"],
        ["Gen 4 ancestor", "TICA / CFF"],
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
    text: "All of our breeding cats undergo health screening and DNA testing, so we can keep producing healthy, happy kittens for generations to come.",
    icon: "heart-pulse",
  },
  {
    id: "pedigrees",
    title: "Pedigrees",
    text: "Our cats come from carefully selected bloodlines with documented 5-generation pedigrees.",
    icon: "scroll",
  },
  {
    id: "tica",
    title: "TICA & CFF Registered",
    text: "All of our cats are registered with TICA (The International Cat Association) and CFF (Cat Fanciers' Federation).",
    icon: "badge",
  },
  {
    id: "pairings",
    title: "Thoughtful Pairings",
    text: "We are a small cattery raising healthy, well-socialized Maine Coons with exceptional temperaments, beautiful features, and strong pedigrees.",
    icon: "heart",
  },
];

export const faqs = [
  {
    q: "What makes Maine Coons different from other cats?",
    a: "Maine Coons are known as the “gentle giants” of the cat world. They are large, highly intelligent, affectionate, and incredibly social. They tend to form strong bonds with their families and often behave more like dogs than cats—following you around, greeting you at the door, and even playing fetch.",
  },
  {
    q: "How does the waiting list work?",
    a: "We currently have a waiting list of approximately 36 individuals and families. A $300 deposit reserves your place and is applied toward the purchase price of your kitten. When it is your turn to choose, we contact you and send photos of the available kittens. If the color, gender, or specific kitten you are hoping for is not available, you are welcome to remain on the list for a future litter. Because families may pass and wait, kitten selections are based solely on the date the deposit is received.",
  },
  {
    q: "What about deposits and pricing?",
    a: "A $300 deposit reserves your place on the waiting list and is applied toward the purchase price of your kitten, which is typically $2,300. Specialty kittens may be priced differently. The remaining balance is due when you pick up your kitten.",
  },
  {
    q: "When do kittens go home, and what do they come with?",
    a: "Our kittens typically go to their new homes between 9 and 12 weeks of age. Before leaving Copper Road, each kitten will have had their first set of vaccinations, multiple deworming treatments, and a complete health examination.",
  },
  {
    q: "Are kittens spayed or neutered before they go home?",
    a: "At this time we do not spay or neuter our kittens before they leave for their new homes. Maine Coons are a slow-maturing breed, and we prefer to allow them additional time to grow and develop before altering. We generally recommend discussing the timing with your veterinarian, but suggest spaying or neutering between 6 and 8 months of age.",
  },
  {
    q: "How do you choose a home for a kitten?",
    a: "We do not use a formal application form in place of a conversation. We simply ask that you share a little about yourself, your family, where you live, any pets you currently have, and anything else you would like us to know. You can reach out by text or email, or we can schedule a phone call, video call, or Facebook Messenger call.",
  },
  {
    q: "How are your kittens raised?",
    a: "We are a small cattery and our cats are beloved members of our family. Kittens are raised underfoot, not in cages. They are handled daily and exposed to normal household life, which makes them well-socialized, confident companions.",
  },
  {
    q: "Are your cats registered and health tested?",
    a: "All of our cats are registered with TICA and CFF and come from carefully selected bloodlines with documented 5-generation pedigrees. All of our breeding cats undergo health screening and DNA testing to help ensure we are producing healthy, happy kittens for generations to come.",
  },
  {
    q: "Can we visit the cattery?",
    a: "Yes. We are located just 11 miles east of Mitchell, South Dakota, at 202 E 4th St, Fulton, SD 57340. Visits are welcome by appointment only—please contact us in advance to schedule a time so we can make sure we are available and give you the attention you deserve.",
  },
  {
    q: "Do you have retired adults available?",
    a: "Sometimes. Iris and Poppy will each have one final litter before retiring from our breeding program. Afterward they will be spayed, fully vaccinated, and ready for a pampered retirement with a family of their own. Please contact us if you are interested.",
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
      { type: "p", text: "Coats are long, silky, and slightly water-resistant, with a ruff, ear tufts, and a plume of a tail. Our program includes black smoke, high silver shaded, blue silver tabby, black silver tabby, red torbie, tortie, and calico. Several of our cats are polydactyl—the famous mitten paws." },
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
      { type: "p", text: "We do not spay or neuter kittens before they go home — Maine Coons are slow-maturing, and we prefer to give them time to grow and develop first. Discuss the timing with your veterinarian; we suggest between 6 and 8 months of age." },
      { type: "h", text: "Screening we practice" },
      { type: "p", text: "All of our breeding cats undergo health screening and DNA testing. We also pay attention to hearts, hips, and the overall structure of the breed. This is not a promise that any cat will be free of every condition; it is how we choose pairings." },
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
      { type: "p", text: "Our kittens typically go to their new homes between 9 and 12 weeks of age." },
      { type: "ul", items: ["Carrier lined with a familiar blanket", "The food they are already eating", "Litter similar to what they know", "A quiet first room, not a party", "Our phone number saved"] },
      { type: "h", text: "The first 48 hours" },
      { type: "p", text: "Expect hiding, huge naps, and a cautious appetite. Sit on the floor and let the kitten do the approaching. Limit visitors." },
      { type: "h", text: "Travel" },
      { type: "p", text: "We do not ship kittens. Pickup, a reasonable delivery, or a meet-up keeps the day low-stress. The carrier stays covered and level." },
      { type: "h", text: "What comes with your kitten" },
      { type: "ul", items: ["First set of vaccinations", "Multiple deworming treatments", "Complete health examination", "Health records and pedigree information", "TICA / CFF registration paperwork, released per your contract"] },
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
      { type: "p", text: "A pedigree is a family tree. Ours are documented five generations deep so we can see color, type, and the health history we plan around." },
      { type: "h", text: "TICA" },
      { type: "p", text: "All of our cats are registered with TICA (The International Cat Association) and CFF (Cat Fanciers' Federation). Registration is how a purebred cat's identity is recorded. It is not the same thing as a show title." },
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

export const trustBadges = ["TICA & CFF Registered", "5-Generation Pedigrees", "Health & DNA Tested", "Raised Underfoot"];

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
