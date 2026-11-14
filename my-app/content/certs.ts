export type Cert = {
  name: string;
  issuer: string;
  year: number;
  /** Public Credly page that verifies the badge. */
  url?: string;
  /** Badge image in /public/certs. */
  logo?: string;
  /** Short summary of what the credential covers, condensed from the Credly page. */
  description?: string;
};

const credly = (id: string) => `https://www.credly.com/badges/${id}/public_url`;

export const certs: Cert[] = [
  {
    name: "Cisco DevNet Associate",
    issuer: "Cisco",
    year: 2022,
    url: credly("4f0a24d2-4484-41e9-921c-37f6781f235b"),
    logo: "/certs/devnet.png",
    description:
      "Completed the DevNet Associate course with 25+ hands-on labs in a virtual lab. Broad understanding of Python coding, Linux, software development and design, working with APIs, network fundamentals, application deployment and security, and infrastructure automation.",
  },
  {
    name: "CCNA: Introduction to Networks",
    issuer: "Cisco",
    year: 2022,
    url: credly("998e9099-f6e8-40fd-8def-7d240fd86efc"),
    logo: "/certs/ccna.png",
    description:
      "Completed Introduction to Networks. Knows IP addressing, how physical and data link protocols support Ethernet, and how to connect switches, routers and end devices. Up to 54 labs and 14 hours of hands-on practice on Cisco hardware or Packet Tracer.",
  },
  {
    name: "IT Specialist - Python",
    issuer: "Certiport",
    year: 2022,
    url: credly("192e302a-7f5a-44af-a1dd-56d676a9ea63"),
    logo: "/certs/python.png",
    description:
      "Shows I can recognize, write and debug Python code that logically solves a problem.",
  },
  {
    name: "IT Specialist - Java",
    issuer: "Certiport",
    year: 2021,
    url: credly("48368c9a-47e1-4d59-9fac-622f5b0e258e"),
    logo: "/certs/java.png",
    description:
      "Shows I can recognize, write and debug Java code that logically solves a problem.",
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco",
    year: 2024,
    url: credly("35038e26-7cb0-49ad-a0cb-1eb88d041900"),
    logo: "/certs/cyber.png",
    description:
      "Introductory cybersecurity knowledge: the global impact of cyber threats on industries, vulnerabilities, threat detection and defense, and the certification paths that follow.",
  },
  {
    name: "Introduction to Data Science",
    issuer: "Cisco",
    year: 2024,
    url: credly("a6644a3e-c5f5-4214-bbf2-e993e94534d6"),
    logo: "/certs/datascience.png",
    description:
      "Broad understanding of the basics of Data Analytics, Data Engineering, Data Science and AI/ML, plus the data career roles open to a student-level earner.",
  },
  { name: "Intro to Generative AI", issuer: "Google Cloud badge", year: 2024 },
];
