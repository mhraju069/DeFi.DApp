import React from 'react'

export default function deposit() {
    return (
        <>
            <section id="deposit" className="fade-in">
                <h1 className="page-title">Deposit Funds</h1>
                <p className="page-subtitle">Add assets to your blockchain wallet. Choose from multiple networks and deposit methods.</p>

                <div className="deposit-grid">
                    <div className="card deposit-card">
                        <form id="depositForm">
                            <div className="form-group">
                                <label htmlFor="asset" className="form-label">Select Asset</label>
                                <div className="asset-selector" id="assetSelector">
                                    <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" alt="ETH" style={{ width: '28px', height: '28px' }} />
                                    <span>Ethereum (ETH)</span>
                                    <i className="dropdown-icon"></i>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="amount" className="form-label">Amount</label>
                                <div className="amount-input">
                                    <input type="number" id="amount" className="form-control" placeholder="0.00" step="0.0001" min="0" required />
                                    <button type="button" className="max-btn">MAX</button>
                                </div>
                                <div className="form-text">Minimum deposit: 0.01 ETH</div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Select Network</label>
                                <div className="network-options">
                                    <div className="network-option active">Ethereum</div>
                                    <div className="network-option">Binance Smart Chain</div>
                                    <div className="network-option">Polygon</div>
                                </div>
                                <div className="form-text">Make sure to select the correct network to avoid loss of funds</div>
                            </div>

                            <div className="deposit-summary">
                                <div className="summary-item">
                                    <span>You will deposit</span>
                                    <span>0 ETH</span>
                                </div>
                                <div className="summary-item">
                                    <span>Network fee</span>
                                    <span>~0.0021 ETH</span>
                                </div>
                                <div className="summary-item">
                                    <span>Estimated arrival</span>
                                    <span>2-5 minutes</span>
                                </div>
                            </div>

                            <button type="submit" className="confirm-deposit-btn">Confirm Deposit</button>
                        </form>
                    </div>

                    <div className="qr-section">
                        <h3>Deposit via Wallet Address</h3>
                        <div className="qr-code">
                            {/* <!-- QR code would be generated here --> */}
                            <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="180" height="180" fill="white" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M36 36H48V48H36V36ZM72 36H84V48H72V36ZM108 36H120V48H108V36ZM144 36H156V48H144V36ZM36 72H48V84H36V72ZM108 72H120V84H108V72ZM36 108H48V120H36V108ZM72 108H84V120H72V108ZM108 108H120V120H108V108ZM144 108H156V120H144V108ZM36 144H48V156H36V144ZM108 144H120V156H108V144Z" fill="black" />
                            </svg>
                        </div>
                        <p className="wallet-address">0x7f3a5b2c8d4e6f1a9b0c3d2e4f6a8b7c5d3e1f4</p>
                        <button className="copy-btn">Copy Address</button>
                        <div className="form-text" style={{ marginTop: '1rem' }}>Send only ETH to this address. Sending other assets may result in permanent loss.</div>
                    </div>
                </div>
            </section>
        </>
    )
}
