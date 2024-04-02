import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  authSecret: process.env["AUTH_SECRET"] || "secret",
  serverAddress: process.env["SERVER_ADDRESS"] || "http://localhost:5000/",
  apiUrl: "https://api.publicapis.org/",
  web3ProviderAddress: process.env["WEB3_PROVIDER_ADDRESS"] || ""
};