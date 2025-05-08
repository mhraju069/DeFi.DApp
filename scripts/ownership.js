const hre = require("hardhat");

async function main() {
  const BXT = await hre.ethers.getContractAt("BXT", "");
  const tx = await BXT.transferOwnership("");
  await tx.wait();
  console.log("Ownership transferred to Defi_v1!");
}

main();
