import { BrowserProvider } from 'ethers';
import React, { useState } from 'react'


export default function ConnectWallet() {
    const [wallet, setWallet] = useState('');
    const Connect = async() => {
        if (!window.ethereum) {
            alert("Please install MetaMask to use this feature.");
            return;
        }
        try{
            const provider  = new BrowserProvider(window.ethereum);
            const signer =await provider.getSigner();
            const address = await signer.getAddress();
            setWallet(address);
        }catch (error) {
            console.error("Error connecting to wallet:", error);
            alert("Failed to connect to wallet. Please try again.");
        }
            
    }
    return{wallet,Connect}
}




