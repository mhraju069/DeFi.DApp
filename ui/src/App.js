import React, { useState } from 'react';
import Particles from './components/particles';
import Nav from './components/nav';
import Home from './components/home';
import Deposit from './components/deposit';
import Stake from './components/stake';
import Swap from './components/swap';
import {ConnectWallet} from './components/connectWallet';

import './App.css';

function App() {
  const [showHome, setShowHome] = useState(true);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showStake, setShowStake] = useState(false);
  const [showSwap, setShowSwap] = useState(false);
  const {Connect,wallet,contract ,provider} = ConnectWallet();

  return (
    <>
      <Particles />

      <Nav showHome={showHome} setShowHome={setShowHome} setShowDeposit={setShowDeposit} showDeposit={showDeposit} showStake={showStake} setShowStake={setShowStake} showSwap={showSwap} setShowSwap={setShowSwap} wallet={wallet} Connect={Connect} />
 
      <main className="main-content">
        {showHome && <Home wallet={wallet} provider={provider} contract={contract}/>}
        {showDeposit && <Deposit contract={contract} wallet={wallet} provider={provider} />}
        {showStake && <Stake contract={contract} provider={provider} wallet={wallet}/>}
        {showSwap && <Swap />}
      </main>




    </>
  );
}

export default App;
