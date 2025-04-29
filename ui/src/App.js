import React, { useState } from 'react';
import Particles from './components/particles';
import Nav from './components/nav';
import Home from './components/home';
import Deposit from './components/deposit';
import Stake from './components/stake';
import Swap from './components/swap';

import './App.css';

function App() {
  const [showHome, setShowHome] = useState(true);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showStake, setShowStake] = useState(false);
  const [showSwap, setShowSwap] = useState(false);



  return (
    <>
      <Particles />

      <Nav showHome={showHome} setShowHome={setShowHome} setShowDeposit={setShowDeposit} showDeposit={showDeposit} showStake={showStake} setShowStake={setShowStake} showSwap={showSwap} setShowSwap={setShowSwap} />
 
      <main className="main-content">
        {showHome && <Home />}
        {showDeposit && <Deposit />}
        {showStake && <Stake />}
        {showSwap && <Swap />}
      </main>




    </>
  );
}

export default App;
