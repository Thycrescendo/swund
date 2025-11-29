require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

if (!PRIVATE_KEY && process.env.HARDHAT_NETWORK !== "hardhat") {
  console.warn("PRIVATE_KEY not set in .env — deployments to real networks will fail");
}

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,                    // ← best optimization possible on Polygon right now
      evmVersion: "paris",
      metadata: {
        bytecodeHash: "none",         // ← deterministic builds (critical for upgradeable contracts)
      },
    },
  },

  networks: {
    hardhat: {
      chainId: 31337,
      // Uncomment below if you ever want to fork Polygon mainnet locally
      // forking: {
      //   url: process.env.POLYGON_MAINNET_RPC || "https://polygon-rpc.com",
      //   blockNumber: 68_000_000,
      // },
    },

    // Polygon Amoy Testnet
    amoy: {
      url: process.env.AMOY_RPC_URL || "https://rpc-amoy.polygon.technology",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 80002,
      gasPrice: "auto",      // 2025 best practice — avoids underpriced errors
      timeout: 120_000,
    },

    // Polygon Mainnet
    polygon: {
      url: process.env.POLYGON_RPC_URL || "https://polygon-rpc.com",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 137,
      gasPrice: "auto",
      timeout: 120_000,
    },
  },

  // No etherscan block at all → zero Polygonscan dependency
  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
    currency: "USD",
  },

  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },

  mocha: {
    timeout: 400_000,
  },
};