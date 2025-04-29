import React from 'react'

export default function home() {
    return (
        <>
            <section id="dashboard" className="fade-in">
                <h1 className="page-title">Dashboard</h1>
                <p className="page-subtitle">Your blockchain portfolio at a glance. Track your assets, staking rewards, and recent transactions in one place.</p>

                <div className="stats-grid">
                    <div className="card stat-card">
                        <h3>Total Balance</h3>
                        <h1>$24,382.45</h1>
                        <div className="sparkline">12.4%</div>
                    </div>

                    <div className="card stat-card">
                        <h3>Staked Assets</h3>
                        <h1>$15,200.00</h1>
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

                <div className="action-cards">
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
                </div>

                <div className="card activity-feed">
                    <h2>Recent Activity</h2>
                    <div className="activity-list">
                        <div className="activity-item">
                            <div className="activity-icon stake">↑</div>
                            <div className="activity-details">
                                <p>Staked 500 BXT</p>
                                <small>2 hours ago</small>
                            </div>
                            <div className="activity-amount">+$1,250.00</div>
                        </div>
                        <div className="activity-item">
                            <div className="activity-icon deposit">↓</div>
                            <div className="activity-details">
                                <p>Deposited 1.5 ETH</p>
                                <small>5 hours ago</small>
                            </div>
                            <div className="activity-amount">+$4,500.00</div>
                        </div>
                        <div className="activity-item">
                            <div className="activity-icon swap">⇄</div>
                            <div className="activity-details">
                                <p>Swapped ETH for BXT</p>
                                <small>1 day ago</small>
                            </div>
                            <div className="activity-amount">-1.5 ETH +1,875 BXT</div>
                        </div>
                        <div className="activity-item">
                            <div className="activity-icon">↓</div>
                            <div className="activity-details">
                                <p>Withdrew 0.5 BTC</p>
                                <small>2 days ago</small>
                            </div>
                            <div className="activity-amount negative">-$15,200.00</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
