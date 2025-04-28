const hre = require("hardhat");

async function main() {
    const start =await hre.ethers.getContractFactory("Defi_v1");
    console.log("Deploying contract...")
    const deploy = await start.deploy()
    await deploy.waitForDeployment()
    console.log("Contract deployed to:", deploy.target)
}
main()