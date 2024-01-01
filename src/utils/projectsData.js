import montuImg from "../../public/images/projects/montu.png";
import gulfCoinImg from "../../public/images/projects/GulfCoin.png";
import alawfarImg from "../../public/images/projects/alawfar.png";
import webPlazaImg from "../../public/images/projects/web_plaza.png";
import kindergarten_worldImg from "../../public/images/projects/kindergarten-world.png";
import APlusImg from "../../public/images/projects/a-plus.png";
import saryAcademyImg from "../../public/images/projects/sary-academy.png";
import yanabeeAcademyImg from "../../public/images/projects/yanabee-academy.png";
import rosewellEnergyImg from "../../public/images/projects/rosewell-energy.png";
import {
  aPlusContent,
  alawfarContent,
  gulfCoinContent,
  kindergartenContent,
  montuContent,
  saryAcademyContent,
  webPlazaContent,
} from "./projectsContent";

export const projectData = [
  {
    title: "Montu Mobile App Builder",
    summary:
      "Montu Is A No-Code Mobile App Builder For Shopify Merchants. We Help You Build A Native Mobile App Instantly, Without The Need For Expensive Dev Teams Or Prior Knowledge Of App-Building.",
    img: montuImg,
    id: 1,
    isFeatured: true,
    content: montuContent,
  },
  {
    title: "Gulf Coin Crypto Currency",
    isFeatured: false,
    summary:
      "Gulf project revolves around an outstanding BEP-20 coin, developed by the top-notch programmers and experts, inspired from the source of its creation to honor the GULF countries for their embracement and contributions to the crypto-world",
    img: gulfCoinImg,
    id: 2,
    content: gulfCoinContent,
  },
  {
    title: "Alawfar",
    isFeatured: false,
    summary:
      "The rise of technology has brought about many changes in the way we live and do business. E-commerce has become a norm, with people all over the world shopping online and having their purchases delivered right to their doorsteps",
    img: alawfarImg,
    content: alawfarContent,
    id: 3,
  },
  {
    title: "Web Plaza",
    isFeatured: false,
    summary:
      "I developed this website to enhance my skills in creating full-stack applications using Next.js 13.4 and MongoDB. It served as a valuable training ground for honing my abilities and allowed me to leverage its components and logic in my freelance projects.",
    img: webPlazaImg,
    content: webPlazaContent,
    id: 4,
    githubLink: "https://github.com/IBassemTarek/web-plaza",
  },
  {
    title: "Kindergarten World",
    isFeatured: false,
    id: 5,
    content: kindergartenContent,
    summary:
      "The application is a cutting-edge tool designed specifically for kindergarten teachers and students",
    img: kindergarten_worldImg,
    githubLink: "https://github.com/IBassemTarek/Kindergarten",
  },
  {
    title: "A-plus Studio",
    isFeatured: false,
    id: 6,
    content: aPlusContent,
    summary:
      "The aim of Studio is to deliver top-notch services and solutions to its clients and help them reach their full potential.",
    img: APlusImg,
  },

  {
    title: "Sary Academy",
    isFeatured: false,
    id: 7,
    content: saryAcademyContent,
    summary:
      "Sary Academy is an innovative nursery school that provides young children with a unique educational experience.",
    img: saryAcademyImg,
  },

  {
    title: "Yanabee Academy",
    isFeatured: false,
    id: 8,

    summary:
      "The Quranic platform and electronic academy project is an exciting and innovative initiative aimed at making the teachings of the Holy Quran more accessible and convenient for students around the world.",
    img: yanabeeAcademyImg,
  },

  {
    title: "Rosewell energy",
    isFeatured: false,
    summary:
      "Rosewell Energy is a company that is dedicated to providing top-notch chemical treatment and engineering services to the oilfield industry.",
    img: rosewellEnergyImg,
    id: 9,
  },
];

export const featureProject = {
  title: "Montu Mobile App Builder",
  summary:
    "Montu Is A No-Code Mobile App Builder For Shopify Merchants. We Help You Build A Native Mobile App Instantly, Without The Need For Expensive Dev Teams Or Prior Knowledge Of App-Building.",
  img: montuImg,
  id: 1,
  isFeatured: true,
  content: montuContent,
};
