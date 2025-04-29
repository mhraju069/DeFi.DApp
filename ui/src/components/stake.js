import React, { useEffect, useState } from 'react'
import { formatEther,parseEther } from 'ethers';
export default function Stake(props) {
    const { wallet, provider, contract } = props;
    const [stakeAmount, setStakeAmount] = useState(0);
    const [duration, setDuration] = useState(1); // Default to 1 min
    const [balance, setBalance] = useState(0);
    const [stakedAssets, setStakedAssets] = useState(0);


    const stake = async () => {
        if (!stakeAmount || isNaN(stakeAmount)){
            alert("Please enter a valid amount to stake.");
            return;
        }
        try{
            const tx = await contract.Stake(parseEther(stakeAmount), duration);
            await tx.wait();
            alert("Staking successful!");
        }catch (error) {
            console.error("Error staking:", error);
            alert("An error occurred while staking. Please try again.");
        }
    }



    useEffect(() => {
        const getBalance = async () => {
            const currentBalance = await contract.balance(wallet);
            const staked = await contract.stakeBalance(wallet);
            setStakedAssets(formatEther(staked));
            setBalance(formatEther(currentBalance));
        };
        getBalance()
    },
        [contract, wallet])

    return (
        <>
            <section id="stake" className="fade-in">
                <h1 className="page-title">Stake Assets</h1>
                <p className="page-subtitle">Earn passive income with your crypto. Stake your assets and start earning rewards today.</p>

                <div className="stake-tabs">
                    <div className="tab active">Stake</div>
                    <div className="tab">Unstake</div>
                    <div className="tab">Rewards</div>
                </div>

                <div className="card stake-card">
                    <div className="asset-info">
                        <img src="https://cryptologos.cc/logos/blockchain-com-bc-logo.png" alt="BXT" style={{ width: '48px', height: '48px' }} />
                        <div className="asset-details">
                            <h3>BlockX Token (BXT)</h3>
                            <p>Current APY: 14.8% | Your stake: {parseFloat(stakedAssets).toFixed(2)} ETH</p>
                        </div>
                    </div>

                    <form id="stakeForm">
                        <div className="form-group">
                            <div className="balance-info">
                                <span>Available: {parseFloat(balance).toFixed(2)} ETH</span>
                                <span>≈ $3,125.00</span>
                            </div>

                            <div className="amount-input">
                                <input type="text" id="stakeAmount" value={stakeAmount} onChange={e => { setStakeAmount(e.target.value) }} className="form-control" placeholder="0.00" step="1" min="0" max="1250" required />
                                <button onClick={() => setStakeAmount(parseFloat(balance).toFixed(2))} type="button" className="max-btn">MAX</button>
                            </div>
                            <div className="form-text">Minimum stake: 0.01 ETH</div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Staking Duration</label>
                            <div className="PB-range-slider-div">
                                <input
                                    type="range"
                                    min="0"
                                    max="300"
                                    value={duration}
                                    className="PB-range-slider"
                                    onChange={(e) => setDuration(Number(e.target.value))}
                                />
                                <p className="PB-range-slidervalue">{(duration)}</p>
                            </div>
                            <div className="form-text">Longer durations typically offer higher APY</div>
                        </div>

                        <div className="projected-rewards">
                            <h4>Projected Rewards</h4>
                            <div className="rewards-chart"></div>
                            <div className="rewards-details">
                                <div>
                                    <span>30 days</span>
                                    <span>≈ 0 BXT</span>
                                </div>
                                <div>
                                    <span>90 days</span>
                                    <span>≈ 0 BXT</span>
                                </div>
                            </div>
                        </div>

                        <button type="button" onClick={stake} className="confirm-stake-btn">Stake Tokens</button>
                    </form>
                </div>

                <div className="other-pools">
                    <h3>Other Staking Pools</h3>
                    <p className="page-subtitle" style={{ marginBottom: 0 }}>Explore additional staking opportunities</p>

                    <div className="pool-grid">
                        <div className="card pool-card">
                            <div className="pool-header">
                                <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" alt="ETH" style={{ width: '28px', height: '28px' }} />
                                <h4>ETH</h4>
                                <span className="apy">8.5% APY</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', margin: '1rem 0', fontSize: '0.9rem' }}>Stake Ethereum and earn rewards</p>
                            <button className="stake-small-btn">Stake</button>
                        </div>
                        <div className="card pool-card">
                            <div className="pool-header">
                                <img src="https://cryptologos.cc/logos/bnb-bnb-logo.png" alt="BNB" style={{ width: '28px', height: '28px' }} />
                                <h4>BNB</h4>
                                <span className="apy">7.2% APY</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', margin: '1rem 0', fontSize: '0.9rem' }}>Stake Binance Coin and earn rewards</p>
                            <button className="stake-small-btn">Stake</button>
                        </div>
                        <div className="card pool-card">
                            <div className="pool-header">
                                <img src="https://cryptologos.cc/logos/polygon-matic-logo.png" alt="MATIC" style={{ width: '28px', height: '28px' }} />
                                <h4>MATIC</h4>
                                <span className="apy">9.1% APY</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', margin: '1rem 0', fontSize: '0.9rem' }}>Stake Polygon and earn rewards</p>
                            <button className="stake-small-btn">Stake</button>
                        </div>
                        <div className="card pool-card">
                            <div className="pool-header">
                                <img src="https://cryptologos.cc/logos/solana-sol-logo.png" alt="SOL" style={{ width: '28px', height: '28px' }} />
                                <h4>SOL</h4>
                                <span className="apy">10.3% APY</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', margin: '1rem 0', fontSize: '0.9rem' }}>Stake Solana and earn rewards</p>
                            <button className="stake-small-btn">Stake</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
