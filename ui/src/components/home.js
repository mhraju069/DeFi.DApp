import { formatEther } from 'ethers';
import React, { useEffect, useState } from 'react'
import Activity from './activity';
import Loader from './loader';


export default function Home(props) {
    const { wallet, contract, Alert } = props;
    const [isWallet, setIsWallet] = useState(false);
    const [balance, setBalance] = useState(0);
    const [stakedAssets, setStakedAssets] = useState(0);
    const [loader, setLoader] = useState(false);


    
    useEffect(() => {
        const getBalance = async () => {
            try {
                setLoader(true);
                const currentBalance = await contract.mainBalance(wallet);
                setBalance(formatEther(currentBalance));
                const count = await contract.stakeCount(wallet);
                let balance = 0
                for (let i = 0; i < count; i++) {
                    const stake = await contract.stakeList(wallet, i);
                    balance += parseFloat(formatEther(stake.balance))
                }
                setStakedAssets(balance);
            }
            catch (error) {
                console.log(error);
            } finally {
                setLoader(false);
            }
        }

        if (!contract || !wallet) return;
        getBalance();
        setIsWallet(true);


    }, [wallet,contract]);



    return (
        <>
            {isWallet ? <> 
            {loader && <Loader />}
            <section id="dashboard" className="fade-in">
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
                        <h1>{stakedAssets} ETH</h1>
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
