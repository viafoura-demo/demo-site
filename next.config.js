require("dotenv").config();

module.exports = {
  reactStrictMode: true,
  env: {
    GRAPHQL_API_TOKEN: process.env.GRAPHQL_API_TOKEN,
    vfDomain: "qa-demo-site.vercel.app",
    vfSiteId: "179672139435639",
    vfSiteUUID: "00000000-0000-4000-8000-a3692e0c0e77",
  },
  images: {
    domains: ["www.datocms-assets.com"],
  },
};
