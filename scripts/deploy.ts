// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import hardhat, { ethers } from "hardhat";

import { Greeter } from "../src/types";

async function main() {


  // We get the contract to deploy
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!") as Greeter;

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);
}


// Only use when forking
async function getImpersonatedSigner(address: string) {
  await hardhat.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [address],
  });

  const signer = await ethers.getSigner(address);
  return signer;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
