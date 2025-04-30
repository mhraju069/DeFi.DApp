import { formatEther } from 'ethers'; // সঠিক
import React, { useEffect, useState } from 'react'
import Activity from './activity';
import stake from './stake';

export default function Home(props) {
    const { wallet, provider, contract } = props;
    const [isWallet, setIsWallet] = useState(false);
    const [balance, setBalance] = useState(0);
    const [stakedAssets, setStakedAssets] = useState(0);
    const [apy, setApy] = useState(0);
    const [transactions, setTransactions] = useState(0);
    const getBalance = async () => {
        try {
            const currentBalance = await contract.balance(wallet);
            setBalance(formatEther(currentBalance));
            const staked = await contract.stakeBalance(wallet);
            setStakedAssets(formatEther(staked));
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (wallet !== "") {
            setIsWallet(true);
        }
        getBalance();
    }, [wallet]);



    return (
        <>
            <section id="dashboard" className="fade-in">
                <h1 className="page-title">Dashboard</h1>
                <p className="page-subtitle">Your blockchain portfolio at a glance. Track your assets, staking rewards, and recent transactions in one place.</p>

                {isWallet && <div className="stats-grid">
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

                </div>}

                {/* <div className="action-cards">
                    <div className="card action-card deposit" data-page="deposit">
                        <h3>Deposit Funds</h3>
                        <p>Add assets to your wallet</p>
                        <button className="action-btn">+ Deposit</button>
                    </div>

                    <div className="card action-card stake" data-page="stake">
                        <h3>Stake Assets</h3>
                        <p>Earn passive income</p>
                        <button className="action-btn">↑ Stake</button>
                    </div>

                    <div className="card action-card exchange" data-page="exchange">
                        <h3>Exchange</h3>
                        <p>Swap tokens instantly</p>
                        <button className="action-btn">⇄ Exchange</button>
                    </div>
                </div> */}

                {contract &&
                    <Activity contract= {contract} />
                }
            </section>
        </>
    )
}
