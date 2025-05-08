import { BrowserProvider, Contract } from 'ethers';
import React, { useState } from 'react'
import Defi_v1 from './Defi_v1.json';
import Alert from './alert';
const contractAddress = "0xd7cc9b08bb76a0CfecC7fADB864160200ed7fb0b"; // Replace with your contract address


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
            console.log(contract.address)
            setContract(contracts);
            setWallet(address);
            setProvider(provider);
            console.log('Owner  : 0x82..6D4' )
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




