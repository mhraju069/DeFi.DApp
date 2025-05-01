import React,{ useState } from 'react'

export default function Nav(props) {
    const diposit = () => {
        if (!props.showDeposit) {
            props.setShowDeposit(true); props.setShowHome(false);props.setShowStake(false); props.setShowSwap(false);
            console.log("Deposit clicked")
        }
    }
    const home = () => {
        if (!props.showHome) {
            props.setShowHome(true); props.setShowDeposit(false);props.setShowStake(false); props.setShowSwap(false);
          console.log("Home clicked")
        }
      }
    const stake = () => {
        if (!props.showStake) {
            props.setShowStake(true); props.setShowHome(false); props.setShowDeposit(false); props.setShowSwap(false);
            console.log("Stake clicked")
        }
    }
    const swap = () => {
        if (!props.showSwap) {
            props.setShowSwap(true); props.setShowHome(false); props.setShowDeposit(false); props.setShowStake(false);
            console.log("Swap clicked")
        }
    }
    const shortAddress = props.wallet.toString().slice(0, 5) + "..." + props.wallet.toString().slice(-5);
    return (
        <>
          <header className="app-header">
                <div className="logo">Block<span>X</span></div>
                {props.wallet &&  <nav className="main-nav">
                    <button onClick={home} className={`nav-link ${props.showHome ? 'active' : ''}`}  >Home</button>
                    <button onClick={diposit} className={`nav-link ${props.showDeposit ? 'active' : ''}`} >Deposit</button>
                    <button onClick={stake} className={`nav-link ${props.showStake ? 'active' : ''}`} >Stake</button>
                    <button onClick={swap} className={`nav-link ${props.showSwap ? 'active' : ''}`} >Exchange</button>
                </nav> }
                <div className="wallet-connect">
                    <button type='button' onClick={props.Connect} className="connect-btn">{!props.wallet ? "Connect Wallet" : shortAddress}</button>
                </div>
            </header>
        </>
    )
}
