import { BrowserProvider, Contract } from 'ethers';
import React, { useState } from 'react'
import Defi_v1 from './Defi_v1.json';
import Alert from './alert';
const contractAddress = "0x79d2C47d09a46367dC9d25B5573B6D63A84C93e6"; // Replace with your contract address


export function ConnectWallet() {
    const [wallet, setWallet] = useState('');
    const [contract, setContract] = useState('');
    const [provider, setProvider] = useState('');
    const [loaders,setLoaders] = useState(false);
    const Connect = async() => {
        if (!window.ethereum) {
            alert("Please install MetaMask to use this feature.");
            return;
        }
        try{
            setLoaders(true);
            const provider  = new BrowserProvider(window.ethereum);
            const signer =await provider.getSigner();
            const address = await signer.getAddress();
            const contracts = new Contract(contractAddress, Defi_v1.abi, signer);
            setContract(contracts);
            setWallet(address);
            setProvider(provider);
            Alert("Wallet connected successfully", "success");
        }catch (error) {
            console.error("Error connecting to wallet:", error);
            Alert("Something went wrong", "error");
        }finally{
            setLoaders(false);
        }
            
    }
    return{Connect,wallet,contract,provider,loaders}
}




