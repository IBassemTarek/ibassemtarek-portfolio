import montuImg from "../../public/images/projects/montu.webp";
import gulfCoinImg from "../../public/images/projects/GulfCoin.webp";
import alawfarImg from "../../public/images/projects/alawfar.webp";
import webPlazaImg from "../../public/images/projects/web_plaza.webp";
import kindergarten_worldImg from "../../public/images/projects/kindergarten-world.webp";
import APlusImg from "../../public/images/projects/a-plus.webp";
import saryAcademyImg from "../../public/images/projects/sary-academy.webp";
import yanabeeAcademyImg from "../../public/images/projects/yanabee-academy.webp";
import rosewellEnergyImg from "../../public/images/projects/rosewell-energy.webp";
import horusArcadeImg from "../../public/images/projects/horus-arcade.webp";
import dahabnaImg from "../../public/images/projects/dahabna.webp";
import shmImg from "../../public/images/projects/shm.webp";
import simplyNikahImg from "../../public/images/projects/simply-nikah.webp";
import smoovImg from "../../public/images/projects/smoov.webp";
import blthanihImg from "../../public/images/projects/blthanih.webp";
import {
  aPlusContent,
  alawfarContent,
  gulfCoinContent,
  kindergartenContent,
  montuContent,
  saryAcademyContent,
  webPlazaContent,
  yanabeeContent,
  rosewellContent,
  smoovContent,
  blthanihContent,
} from "./projectsContent";

// Apps with their own page link there (`href`, on this site or external)
// instead of to a /projects/<id> case study; `tag` is the label above the
// card title. `kind` ("app" or "web") drives the filters on /projects.
export const projectData = [
  {
    title: "Horus Arcade",
    kind: "app",
    tag: "Mobile game · iOS & Android",
    isFeatured: true,
    summary:
      "23 quick arcade, puzzle, brain, board and word games in one neon, ancient-Egypt-themed arcade hosted by Horus the falcon. Free on iPhone and Android.",
    img: horusArcadeImg,
    id: 10,
    href: "/horus-arcade",
  },
  {
    title: "Dahabna",
    kind: "app",
    tag: "Gold prices app · iOS & Android",
    isFeatured: false,
    summary:
      "Live 24k, 21k and 18k gold prices in Egypt, a gold portfolio, zakat calculator and price alerts. Free on the App Store and Google Play.",
    img: dahabnaImg,
    id: 11,
    href: "/dahabna",
  },
  {
    title: "SHM",
    kind: "app",
    tag: "Trading tools app · Android",
    isFeatured: false,
    summary:
      "Market data and trading tools for Egyptian investors: EGX support and resistance levels, live price alerts and trading calculators, in Arabic and English.",
    img: shmImg,
    id: 12,
    href: "https://mindovaq.com/shm/",
  },
  {
    title: "Simply Nikah",
    kind: "app",
    tag: "Matrimony app · iOS & Android",
    isFeatured: false,
    summary:
      "A Shariah-compliant marriage app backed by Mufti Menk: selfie-verified profiles, interest-based matchmaking, image privacy and AI message moderation.",
    img: simplyNikahImg,
    id: 13,
    href: "https://simplynikah.app",
  },
  {
    title: "SmooV",
    kind: "app",
    tag: "Furniture moving app · Flutter",
    isFeatured: false,
    summary:
      "Flutter client and driver apps for SmooV (formerly Lockers), a Riyadh platform for booking furniture moves at a fixed price per room.",
    img: smoovImg,
    id: 14,
    content: smoovContent,
  },
  {
    title: "blthanih",
    kind: "app",
    tag: "Salon & spa management · React Native",
    isFeatured: false,
    summary:
      "React Native client and employee apps for blthanih (بالثانية), a Saudi salon and spa platform: booking, offers and loyalty for clients, HR for staff.",
    img: blthanihImg,
    id: 15,
    content: blthanihContent,
  },
  {
    title: "Montu Mobile App Builder",
    kind: "app",
    tag: "No-code app builder · Shopify",
    summary:
      "A no-code app builder for Shopify merchants to launch native iOS and Android apps without a dev team. Backend, integrations and React Native features.",
    img: montuImg,
    id: 1,
    isFeatured: false,
    content: montuContent,
  },
  {
    title: "Gulf Coin Crypto Currency",
    kind: "app",
    tag: "Crypto wallet & presale app",
    isFeatured: false,
    summary:
      "A transaction management app for GulfCoin, a BEP-20 token: wallet and account visibility, presale purchases and investment tracking.",
    img: gulfCoinImg,
    id: 2,
    content: gulfCoinContent,
  },
  {
    title: "Alawfar",
    kind: "app",
    tag: "E-commerce app",
    isFeatured: false,
    summary:
      "An e-commerce app built around cash on delivery, for shoppers who prefer to receive their order before they pay.",
    img: alawfarImg,
    content: alawfarContent,
    id: 3,
  },
  {
    title: "Web Plaza",
    kind: "web",
    tag: "Full-stack web app · Next.js",
    isFeatured: false,
    summary:
      "A full-stack Next.js and MongoDB e-commerce web app I built to sharpen my full-stack skills, later reused in freelance projects. Source on GitHub.",
    img: webPlazaImg,
    content: webPlazaContent,
    id: 4,
    githubLink: "https://github.com/IBassemTarek/web-plaza",
  },
  {
    title: "Kindergarten World",
    kind: "app",
    tag: "Education app",
    isFeatured: false,
    id: 5,
    content: kindergartenContent,
    summary:
      "A classroom and learning management app for kindergarten teachers and students, covering assignments, attendance, progress and learning resources.",
    img: kindergarten_worldImg,
    githubLink: "https://github.com/IBassemTarek/Kindergarten",
  },
  {
    title: "A-plus Studio",
    kind: "web",
    tag: "Business website · WordPress",
    isFeatured: false,
    id: 6,
    content: aPlusContent,
    summary:
      "A WordPress website for a services studio, built to present its work, build trust and win new clients.",
    img: APlusImg,
  },

  {
    title: "Sary Academy",
    kind: "web",
    tag: "Education website",
    isFeatured: false,
    id: 7,
    content: saryAcademyContent,
    summary:
      "A nursery school platform that combines learning and play into one educational experience for young children.",
    img: saryAcademyImg,
  },

  {
    title: "Yanabee Academy",
    kind: "web",
    tag: "Quran learning platform",
    isFeatured: false,
    id: 8,
    content: yanabeeContent,
    summary:
      "A Quran platform and online academy for lessons, recitation practice, progress tracking and Quranic sciences.",
    img: yanabeeAcademyImg,
  },

  {
    title: "Rosewell Energy",
    kind: "web",
    tag: "Company website",
    isFeatured: false,
    summary:
      "A website for an oilfield chemical treatment and engineering services company.",
    img: rosewellEnergyImg,
    content: rosewellContent,
    id: 9,
  },
];

export const featureProject = projectData.find(({ isFeatured }) => isFeatured);
