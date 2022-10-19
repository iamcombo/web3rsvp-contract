import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config({ path: ".env" });

const HTTPS_URL = process.env.HTTPS_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
const POLYGON_SCAN_KEY = process.env.POLYGON_SCAN_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: HTTPS_URL,
      accounts: [PRIVATE_KEY],
      gas: 2100000,
      gasPrice: 8000000000,
    },
  },
  etherscan: {
    apiKey: POLYGON_SCAN_KEY,
  },
};

export default config;
