import React from 'react'

export default function stake() {
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
                            <h3>BlockchainX Token (BXT)</h3>
                            <p>Current APY: 14.8% | Your stake: 1,250 BXT ($3,125.00)</p>
                        </div>
                    </div>

                    <form id="stakeForm">
                        <div className="form-group">
                            <div className="balance-info">
                                <span>Available: 1,250 BXT</span>
                                <span>≈ $3,125.00</span>
                            </div>

                            <div className="amount-input">
                                <input type="number" id="stakeAmount" className="form-control" placeholder="0.00" step="1" min="0" max="1250" required />
                                <button type="button" className="max-btn">MAX</button>
                            </div>
                            <div className="form-text">Minimum stake: 10 BXT</div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Staking Duration</label>
                            <div className="duration-options">
                                <div className="duration-option">30 days</div>
                                <div className="duration-option active">90 days</div>
                                <div className="duration-option">180 days</div>
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

                        <button type="submit" className="confirm-stake-btn">Stake Tokens</button>
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
