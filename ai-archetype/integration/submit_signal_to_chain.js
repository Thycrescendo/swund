require('dotenv').config();
const { ethers } = require('ethers');
const fs = require('fs');

// Load models.json for config
const models = JSON.parse(fs.readFileSync('../models.json', 'utf8')).models;

// Your contract ABI/address (from smart-contract/)
const abi = [/* ABI here, e.g., function submitSignal(uint256 signal) */];
const contractAddress = '0xa05913F7Da55d238BF210B414003149676889889';  // Your vault

async function submitToChain(signal) {
  const provider = new ethers.JsonRpcProvider(process.env.POLYGON_AMOY_RPC);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const contract = new ethers.Contract(contractAddress, abi, wallet);
  const tx = await contract.submitSignal(signal);
  await tx.wait();
  console.log(`Signal submitted: ${tx.hash}`);
}

// Example: From inference
const signal = 12345;  // From AI model output
submitToChain(signal);