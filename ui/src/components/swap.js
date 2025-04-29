import React from 'react'

export default function swap() {
    return (
        <>
            <section id="exchange" className="fade-in">
                <h1 className="page-title">Token Exchange</h1>
                <p className="page-subtitle">Swap between assets instantly with our decentralized exchange. Low fees, fast transactions.</p>

                <div className="card exchange-card">
                    <form id="exchangeForm">
                        <div className="swap-section">
                            <div className="swap-from">
                                <label className="form-label">From</label>
                                <div className="token-selector">
                                    <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" alt="ETH" style={{ width: '28px', height: '28px' }} />
                                    <span>ETH</span>
                                    <i className="dropdown-icon"></i>
                                </div>
                                <input type="number" id="fromAmount" className="form-control" placeholder="0.00" step="0.0001" min="0" required />
                                <div className="balance">Balance: 2.45 ETH</div>
                            </div>

                            <div className="swap-divider">
                                <button type="button" className="swap-direction-btn">↓</button>
                            </div>

                            <div className="swap-to">
                                <label className="form-label">To</label>
                                <div className="token-selector">
                                    <img src="https://cryptologos.cc/logos/blockchain-com-bc-logo.png" alt="BXT" style={{ width: '28px', height: '28px' }} />
                                    <span>BXT</span>
                                    <i className="dropdown-icon"></i>
                                </div>
                                <input type="number" id="toAmount" className="form-control" placeholder="0.00" step="0.1" min="0" required />
                                <div className="balance">Balance: 1,250 BXT</div>
                            </div>
                        </div>

                        <div className="swap-details">
                            <div className="detail-item">
                                <span>Exchange Rate</span>
                                <span>1 ETH = 1,250 BXT</span>
                            </div>
                            <div className="detail-item">
                                <span>Price Impact</span>
                                <span className="positive">0.5%</span>
                            </div>
                            <div className="detail-item">
                                <span>Liquidity Provider Fee</span>
                                <span>0.3 BXT</span>
                            </div>
                            <div className="detail-item">
                                <span>Minimum Received</span>
                                <span>1,245 BXT</span>
                            </div>
                        </div>

                        <button type="submit" className="swap-btn">Swap Tokens</button>
                    </form>
                </div>

                <div className="price-chart">
                    <div className="chart-header">
                        <h3>BXT/ETH</h3>
                        <div className="time-filters">
                            <span className="active">1H</span>
                            <span>1D</span>
                            <span>1W</span>
                            <span>1M</span>
                        </div>
                    </div>
                    <div className="chart-container">
                        {/* <!-- Chart would be rendered here --> */}
                        <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="none">
                            <path d="M0,300 L50,250 L100,280 L150,220 L200,260 L250,200 L300,240 L350,180 L400,220"
                                stroke="url(#chartGradient)"
                                strokeWidth="3"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round" />
                            <defs>
                                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#B300FF" />
                                    <stop offset="100%" stopColor="#6A0DAD" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </section>
        </>
    )
}
