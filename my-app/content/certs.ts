export type Cert = {
  name: string;
  issuer: string;
  year: number;
  /** Public Credly page that verifies the badge. */
  url?: string;
  /** Badge image in /public/certs. */
  logo?: string;
};

const credly = (id: string) => `https://www.credly.com/badges/${id}/public_url`;

export const certs: Cert[] = [
  {
    name: "Cisco DevNet Associate",
    issuer: "Cisco",
    year: 2022,
    url: credly("4f0a24d2-4484-41e9-921c-37f6781f235b"),
    logo: "/certs/devnet.png",
  },
  {
    name: "CCNA: Introduction to Networks",
    issuer: "Cisco",
    year: 2022,
    url: credly("998e9099-f6e8-40fd-8def-7d240fd86efc"),
    logo: "/certs/ccna.png",
  },
  {
    name: "IT Specialist - Python",
    issuer: "Certiport",
    year: 2022,
    url: credly("192e302a-7f5a-44af-a1dd-56d676a9ea63"),
    logo: "/certs/python.png",
  },
  {
    name: "IT Specialist - Java",
    issuer: "Certiport",
    year: 2021,
    url: credly("48368c9a-47e1-4d59-9fac-622f5b0e258e"),
    logo: "/certs/java.png",
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco",
    year: 2024,
    url: credly("35038e26-7cb0-49ad-a0cb-1eb88d041900"),
    logo: "/certs/cyber.png",
  },
  { name: "Intro to Data Science", issuer: "Cisco", year: 2024 },
  { name: "Intro to Generative AI", issuer: "Google Cloud badge", year: 2024 },
];
