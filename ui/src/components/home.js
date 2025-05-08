import { formatEther } from 'ethers';
import React, { useEffect, useState } from 'react'
import Activity from './activity';


export default function Home(props) {
    const { wallet, contract, setLoader, Alert } = props;
    const [isWallet, setIsWallet] = useState(false);
    const [balance, setBalance] = useState(0);
    const [stakedAssets, setStakedAssets] = useState(0);


    const getBalance = async () => {
        try {
            setLoader(true);
            const currentBalance = await contract.mainBalance(wallet);
            setBalance(formatEther(currentBalance));
            // const staked = await contract.stakeBalance(wallet);
            // setStakedAssets(formatEther(staked));
        }
        catch (error) {
            Alert("Something went wrong", "error")
            console.log(error);
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
        if (wallet && contract) {
            getBalance();
            setIsWallet(true);
        }
       
    }, [wallet]);



    return (
        <>
            {isWallet ? <> <section id="dashboard" className="fade-in">
                <h1 className="page-title">Dashboard</h1>
                <p className="page-subtitle">Your blockchain portfolio at a glance. Track your assets, staking rewards, and recent transactions in one place.</p>

                <div className="stats-grid">
                    <div className="card stat-card">
                        <h3>Deposited Balance</h3>
                        <h1>{parseFloat(balance).toFixed(2)} ETH</h1>
                        <div className="sparkline">12.4%</div>
                    </div>

                    <div className="card stat-card">
                        <h3>Staked Assets</h3>
                        <h1>{parseFloat(stakedAssets).toFixed(2)} ETH</h1>
                        <div className="sparkline">8.2%</div>
                    </div>

                    <div className="card stat-card">
                        <h3>APY</h3>
                        <h1>14.8%</h1>
                        <div className="sparkline">1.2%</div>
                    </div>

                    <div className="card stat-card">
                        <h3>Transactions</h3>
                        <h1>142</h1>
                        <div className="sparkline">24.7%</div>
                    </div>

                </div>
            </section>
                <Activity contract={contract} /> </>
                :
                <h3 style={{
                    textAlign: "center",
                    marginTop: "20%",
                    fontSize: "3em",
                    color: "#fff",
                    fontWeight: "bold",
                    fontFamily: "cursive"
                }}>Connect Your Wallet First</h3>}
        </>
    )
}
