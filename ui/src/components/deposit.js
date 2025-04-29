import React, { useEffect } from 'react'

import { parseEther,formatEther } from 'ethers';

export default function Deposit(props) {
    const { contract, wallet , provider } = props
    const [amount, setAmount] = React.useState(0)
    const [balance, setBalance] = React.useState(0)
    useEffect(() => {
        const getBalance = async () => 
            { const Balance = await provider.getBalance(wallet)
            setBalance(formatEther(Balance))
             };
        getBalance()
    },
        [contract, wallet])


    const deposit = async () => {
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            alert("Please enter a valid amount in ETH");
            return;
        }
        try {

            const depositAmount = await contract.Deposit({
                value: parseEther(amount)
            })
            await depositAmount.wait()
            console.log("Deposit successful", depositAmount)
            alert("Deposit successful")
        } catch (error) {
            console.error("Deposit failed", error)
            alert("Deposit failed. Please try again.")
        }
    }
    return (
        <>
            <section id="deposit" className="fade-in">
                <h1 className="page-title">Deposit Funds</h1>
                <p className="page-subtitle">Add assets to your blockchain wallet. Choose from multiple networks and deposit methods.</p>

                <div className="deposit-grid">
                    <div className="card deposit-card">
                        <form id="depositForm">
                        <div className="form-group">
                        <label htmlFor="asset" className="form-label">Available Balance for deposit</label>
                                <div className="amount-input">
                                    <input type="text" id="amount" value={parseFloat(balance).toFixed(2) + ' ETH'} className="form-control" disabled step="0.0001" min="0" required />
                                </div>
                                
                            </div>


                            <div className="form-group">
                                <label htmlFor="asset" className="form-label">Select Asset</label>
                                <div className="asset-selector" id="assetSelector">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" preserveAspectRatio="xMidYMid" viewBox="0 0 256 417" id="ethereum">
                                        <path fill="#343434" d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"></path>
                                        <path fill="#8C8C8C" d="M127.962 0L0 212.32l127.962 75.639V154.158z"></path>
                                        <path fill="#3C3C3B" d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z"></path>
                                        <path fill="#8C8C8C" d="M127.962 416.905v-104.72L0 236.585z"></path>
                                        <path fill="#141414" d="M127.961 287.958l127.96-75.637-127.96-58.162z"></path>
                                        <path fill="#393939" d="M0 212.32l127.96 75.638v-133.8z"></path>
                                    </svg>
                                    <span>Ethereum (ETH)</span>
                                    <i className="dropdown-icon"></i>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="amount" className="form-label">Amount</label>
                                <div className="amount-input">
                                    <input type="text" id="amount" value={amount} onChange={e => setAmount(e.target.value)} className="form-control" placeholder="ETH" step="0.0001" min="0" required />
                                    <button type="button" onClick={() => setAmount(parseFloat(balance).toFixed(2))} className="max-btn">MAX</button>
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

                            <button type="button" onClick={deposit} className="confirm-deposit-btn">Confirm Deposit</button>
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
