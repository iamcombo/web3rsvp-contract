import { ethers } from "hardhat";

async function main() {
  const rsvpContractFactory = await ethers.getContractFactory("Web3RSVP");
  const rsvpContract = await rsvpContractFactory.deploy();

  await rsvpContract.deployed();
  
  console.log('====================================');
  console.log("Contract deployed to:", rsvpContract.address);
  console.log('====================================');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
