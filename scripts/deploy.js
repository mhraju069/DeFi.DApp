const { ethers, upgrades } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // 1. Deploy BXT contract
    const BXT = await ethers.getContractFactory("BXT");
    console.log("Deploying BXT contract...");
    const bxtInstance = await upgrades.deployProxy(BXT, [], { kind: 'uups' });
    await bxtInstance.waitForDeployment();
    const bxtAddress = await bxtInstance.getAddress();
    console.log("BXT deployed to:", bxtAddress);

    // 2. Deploy Defi_v1 contract
    const Defi_v1 = await ethers.getContractFactory("Defi_v1");
    console.log("Deploying Defi_v1 contract...");
    const defiInstance = await upgrades.deployProxy(Defi_v1, [], { kind: 'uups' });
    await defiInstance.waitForDeployment();
    const defiAddress = await defiInstance.getAddress();
    console.log("Defi_v1 deployed to:", defiAddress);

    // 3. Verify ownership before transfer
    console.log("Current BXT owner:", await bxtInstance.owner());
    
    // 4. Transfer ownership to Defi_v1
    console.log("Transferring BXT ownership to Defi_v1...");
    const transferTx = await bxtInstance.transferOwnership(defiAddress);
    await transferTx.wait();
    console.log("Ownership transferred, new owner:", await bxtInstance.owner());

    // 5. Set BXT address in Defi_v1 contract
    console.log("Setting BXT address in Defi_v1...");
    const setBxtTx = await defiInstance.BXT_Address(bxtAddress);
    await setBxtTx.wait();
    
    // 6. Verify BXT address in Defi_v1
    console.log("BXT address in Defi_v1:", await defiInstance.bxt());

    // 7. Additional verification steps
    console.log("\nDeployment Verification:");
    console.log("BXT Owner:", await bxtInstance.owner());
    console.log("Defi_v1 BXT Address:", await defiInstance.bxt());
    console.log("Deployer Balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)));
}

main().catch((error) => {
    console.error("Deployment failed:", error);
    process.exitCode = 1;
});