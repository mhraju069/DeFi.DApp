import { BrowserProvider, Contract } from 'ethers';
import React, { useState } from 'react'
import Defi_v1 from './Defi_v1.json';
const contractAddress = "0x84e876E5153c945C744C692EA6323180121eE3F9"; // Replace with your contract address
export function ConnectWallet() {
    const [wallet, setWallet] = useState('');
    const [contract, setContract] = useState('');
    const [provider, setProvider] = useState('');
    const Connect = async() => {
        if (!window.ethereum) {
            alert("Please install MetaMask to use this feature.");
            return;
        }
        try{
            const provider  = new BrowserProvider(window.ethereum);
            const signer =await provider.getSigner();
            const address = await signer.getAddress();
            const contracts = new Contract(contractAddress, Defi_v1.abi, signer);
            setContract(contracts);
            setWallet(address);
            setProvider(provider);
        }catch (error) {
            console.error("Error connecting to wallet:", error);
            alert("Failed to connect to wallet. Please try again.");
        }
            
    }
    return{Connect,wallet,contract,provider}
}




